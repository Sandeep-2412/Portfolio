# RAG Pipeline

import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from rag import get_chain, run_chain  # get_chain warms up on startup

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address, default_limits=["30/minute"])

# Semaphore: at most 5 RAG calls in flight at once — prevents OOM under spike
_sem = asyncio.Semaphore(5)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Warming up RAG chain…")
    get_chain()
    logger.info("RAG chain ready.")
    yield


app = FastAPI(title="Portfolio RAG API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/ask")
@limiter.limit("20/minute")
async def ask(req: QuestionRequest, request: Request):
    q = req.question.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    if len(q) > 500:
        raise HTTPException(status_code=400, detail="Question too long (max 500 chars).")

    if _sem.locked() and _sem._value == 0:
        raise HTTPException(status_code=503, detail="Server busy — please try again in a moment.")

    try:
        async with _sem:
            loop = asyncio.get_event_loop()
            answer = await asyncio.wait_for(
                loop.run_in_executor(None, run_chain, q),
                timeout=40.0,
            )
        return {"answer": answer}
    except asyncio.TimeoutError:
        logger.warning("RAG timeout for question: %s", q[:80])
        raise HTTPException(status_code=504, detail="Request timed out — please try again.")
    except Exception as exc:
        logger.error("RAG error: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to process your question.")

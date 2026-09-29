import logging
import os
from datetime import date
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from pypdf import PdfReader

load_dotenv()

logger = logging.getLogger(__name__)

RESUME_PATH = Path(__file__).parent.parent / "public" / "files" / "Venkata_Sandeep_Macha_Portfolio_Resume.pdf"

_resume_text = None
_client = None


def _setup():
    global _resume_text, _client

    api_key = os.environ.get("NVIDIA_API_KEY")
    if not api_key:
        raise RuntimeError("NVIDIA_API_KEY is not set.")

    _client = OpenAI(
        api_key=api_key,
        base_url="https://integrate.api.nvidia.com/v1",
    )
    reader = PdfReader(str(RESUME_PATH))
    _resume_text = "\n".join(page.extract_text() or "" for page in reader.pages)
    logger.info("Resume loaded: %d chars", len(_resume_text))


def get_chain():
    if _client is None:
        _setup()
    return _client


SYSTEM_PROMPT = """You are Sandeep Macha's personal AI assistant on his portfolio website. The resume below is your only source of truth — read it carefully before answering. Speak AS Sandeep in first person — "I build...", "I've worked on...", "My experience is..." — like he is right there talking to the visitor. Sound like a sharp engineer having a real conversation: confident, specific, and natural. No bullet points. No generic filler.

Rules:
- The RESUME below is the single source of truth. Read it word for word. Do NOT infer, assume, or substitute facts from anywhere else.
- Use exact details from the resume: company names, dates, technologies, metrics. If the resume says May 2026, say May 2026. I am on F1-OPT Visa, so I don't need sponsorship for now. I have a US work authorization until June 2029.
- Base every answer strictly on the resume.
- Answer in first person as Sandeep. Be detailed: 4 to 5 sentences, weaving in specifics from the resume wherever they fit naturally.
- If the topic is adjacent to something in the resume, bridge naturally: e.g. "I haven't shipped Kafka in production, but I've worked extensively with event-driven patterns — so the mental model is very familiar."
- If nothing in the resume is related: "That's outside my main areas — but ask me about distributed backends, AI/ML pipelines, cloud infra, or full-stack work and I can go deep."
- If the question is unrelated to Sandeep: "I'm here to talk about Sandeep's work and background — what would you like to know?"
"""


def run_chain(question: str) -> str:
    get_chain()
    today = date.today().strftime("%B %d, %Y")
    user_prompt = (
        f"Today's date: {today}. Use this to determine whether resume dates are past or future.\n\n"
        f"RESUME:\n{_resume_text}\n\nQuestion: {question}\nAnswer:"
    )
    response = _client.chat.completions.create(
        model="google/diffusiongemma-26b-a4b-it",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
    )
    return response.choices[0].message.content or ""

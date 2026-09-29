from dotenv import load_dotenv
load_dotenv()
from rag import run_chain
print(run_chain("Tell me about Sandeep Macha in a short answer."))

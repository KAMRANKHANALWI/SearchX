from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from src.agents.webSearch.app import webSearchAgent
from typing import Optional
from fastapi import Body
from src.agents.webSearch.outputGenerator import generate_chat_response

# **Not Mandatory But In Case Error in Certification handling**
import ssl
import certifi

ssl_context = ssl.create_default_context(cafile=certifi.where())


app = FastAPI(title="SearchX Backend", description="Crawl web with Love")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ! Allowing all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Type"],
)


@app.get("/chat/{message}")
async def chat_with_agent(
    message: str,
    checkpoint_id: Optional[str] = Query(
        None, description="Checkpoint ID for resuming chat"
    ),
):
    """
    Chat with the web search agent.
    """
    try:
        # Server Sent Events (SSE) (not same as WebSockets)
        return StreamingResponse(
            # Generator function to stream the response : By the time it receives the chunks , it will emit it.
            generate_chat_response(message, checkpoint_id),
            # Protocol - Server Sent Events
            media_type="text/event-stream",
        )
    except Exception as e:
        return {"error": str(e)}


# Testing purpose
@app.get("/check")
async def health_check():
    try:
        return {"status": "check", "service": "Simba Op !!!"}
    except Exception as e:
        return {"error": str(e)}

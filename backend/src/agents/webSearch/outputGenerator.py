from langchain_core.messages import HumanMessage, AIMessage, AIMessageChunk
from uuid import uuid4
from typing import Optional
from src.agents.webSearch.app import webSearchAgent
import json


def serialize_aimssg_chunk(chunk):
    if isinstance(chunk, AIMessageChunk):
        return chunk.content
    elif isinstance(chunk, dict):
        return chunk.get("content", "")
    else:
        raise ValueError(f"Unexpected message type: {type(chunk)}")


async def generate_chat_response(message: str, checkpoint_id: Optional[str] = None):
    isNewChat = checkpoint_id is None

    # * Note : We are not putting initiating the events in part 2 because we need to send back the checkpoint ID first
    # ==================== Part 1 : ====================
    if isNewChat:
        new_checkpoint_id = str(uuid4())
        # Generate a new checkpoint id
        config = {
            "configurable": {
                "thread_id": new_checkpoint_id,  # Unique identifier for the conversation
            }
        }
        events = webSearchAgent.astream_events(
            {"messages": [HumanMessage(content=message)]},
            config=config,
            version="v2",
        )
        # yield sends data, pauses the function, and resumes later — useful for streaming data step by step.
        # Sends the new checkpoint ID to the client first, so the client knows this chat's unique ID.
        yield f'data: {{"type": "checkpoint", "checkpoint_id": "{new_checkpoint_id}"}}\n\n'
    else:  # Resuming a existing chat with a checkpoint ID
        config = {
            "configurable": {
                "thread_id": checkpoint_id,  # Get this id via fxn parameter
            }
        }
        events = webSearchAgent.astream_events(
            {"messages": [HumanMessage(content=message)]},
            config=config,
            version="v2",
        )
    # ==================== Part 2 : Streaming the response ====================
    async for event in events:
        event_type = event.get("event")

        if event_type == "on_chat_model_stream":
            chunk_content = serialize_aimssg_chunk(event["data"]["chunk"])
            safe_content = chunk_content.replace("'", "\\'").replace("\n", "\\n")
            yield f'data: {{"type": "content", "content": "{safe_content}"}}\n\n'

        elif event_type == "on_chat_model_end":
            tool_calls = (
                # Check if the 'output' object inside 'event["data"]' has an attribute named 'tool_calls'
                event["data"]["output"].tool_calls
                if hasattr(event["data"]["output"], "tool_calls")
                # If 'tool_calls' does not exist, use an empty list instead
                else []
            )
            # Filter the tool_calls list to include only the calls where the "name" key is "tavily_search".
            search_calls = [
                call for call in tool_calls if call["name"] == "tavily_search"
            ]

            if search_calls:
                search_query = search_calls[0]["args"].get("query", "")
                safe_query = (
                    search_query.replace('"', '\\"')
                    .replace("'", "\\'")
                    .replace("\n", "\\n")
                )
                yield f'data: {{"type": "search_start", "query": "{safe_query}"}}\n\n'

        elif event_type == "on_tool_end":
            tool_output = event.get("data", {}).get("output")
            if tool_output and tool_output.name == "tavily_search":
                content_str = tool_output.content

                if content_str and isinstance(content_str, str):
                    parsed_content = json.loads(content_str)
                    results_list = parsed_content.get("results", [])
                    urls = [
                        item["url"]
                        for item in results_list
                        if isinstance(item, dict) and "url" in item
                    ]
                    if urls:
                        urls_json = json.dumps(urls)
                        yield f'data: {{"type": "search_results", "urls": {urls_json}}}\n\n'

    yield f'data: {{"type": "end"}}\n\n'

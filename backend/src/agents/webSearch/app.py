from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from typing import Annotated
from langgraph.graph import add_messages, StateGraph, END
from pydantic import BaseModel
from langgraph.graph import StateGraph, END
from enum import Enum
from langchain_tavily import TavilySearch
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import SystemMessage

load_dotenv()
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", model_kwargs={"streaming": True})
webSearch = TavilySearch(max_results=10)
tools = [webSearch]
llm_with_tools = llm.bind_tools(tools)

memory = MemorySaver()


class ChatState(BaseModel):
    messages: Annotated[list, add_messages]


class Node(Enum):
    CHATBOT_NODE = "chatbot_node"
    TOOLS_NODE = "tools_node"


async def chatbot_node(state: ChatState) -> ChatState:
    chat_history = state.messages

    # Agent is keep asking whether to use travily_search tool or not . To avoid that create a system prompt
    # Add system prompt if it's the first message
    if len(chat_history) == 1:
        system_message = SystemMessage(
            content=f"""
                    You are a smart and efficient WebSearch Agent.

                    Your job is to answer user questions clearly and briefly.

                    **RULES:**
                    1. If you already know the answer with high confidence, respond directly in very simple and short language.
                    2. If you are unsure or lack information, immediately use the `tavily_search` tool **without asking for permission**.
                    3. Always prefer facts and up-to-date data. If the question involves current events, dates, prices, or trending topics, use the tool.
                    4. Your answers should be:
                    - Short and to the point
                    - Easy to understand
                    - Avoid technical jargon unless explicitly asked
                    5. Do not say you are an AI. Do not explain what tools you are using unless asked.

                    **Examples:**
                    - ❌ “I think...” → Not allowed
                    - ✅ “Yes, it's available.” → Perfect
                    - ✅ *[Uses search tool silently and responds]*

                    **Note:** Always follow these rules strictly.
                """
        )
        chat_history = [system_message] + chat_history

    ai_response = await llm_with_tools.ainvoke(chat_history)
    return {"messages": [ai_response]}


async def tools_router(state: ChatState) -> str:
    last_message = state.messages[-1]
    if hasattr(last_message, "tool_calls") and len(last_message.tool_calls) > 0:
        return Node.TOOLS_NODE.value
    else:
        return END


tool_node = ToolNode(name=Node.TOOLS_NODE.value, tools=tools)
graph = StateGraph(ChatState)
graph.add_node(Node.CHATBOT_NODE.value, chatbot_node)
graph.set_entry_point(Node.CHATBOT_NODE.value)
graph.add_node(Node.TOOLS_NODE.value, tool_node)

graph.add_conditional_edges(
    Node.CHATBOT_NODE.value,
    tools_router,
    {
        Node.TOOLS_NODE.value: Node.TOOLS_NODE.value,
        END: END,
    },
)
graph.add_edge(Node.TOOLS_NODE.value, Node.CHATBOT_NODE.value)
webSearchAgent = graph.compile(checkpointer=memory)

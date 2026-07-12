from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """The state of the LangGraph agent."""
    messages: Annotated[Sequence[BaseMessage], add_messages]
    # We can add more state tracking here if needed, like current_hcp_id
    current_hcp_id: str | None
    current_context: dict | None

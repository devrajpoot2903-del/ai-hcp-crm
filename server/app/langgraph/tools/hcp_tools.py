"""
Placeholder LangGraph tools.

Each function decorated with @tool becomes a tool the agent can call.
"""
from langchain_core.tools import tool


@tool
def search_hcp_database(query: str) -> str:
    """Search the HCP database for providers matching the query."""
    # TODO: implement real DB lookup
    return f"[Placeholder] No HCPs found for query: {query}"


@tool
def get_interaction_history(hcp_id: str) -> str:
    """Retrieve interaction history for a given HCP ID."""
    # TODO: implement real DB lookup
    return f"[Placeholder] No interactions found for HCP ID: {hcp_id}"

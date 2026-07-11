"""
Placeholder LangGraph HCP CRM Agent.

Defines the agent graph structure. No business logic yet.
"""
from typing import TypedDict, Annotated
import operator

from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage


# ── State ─────────────────────────────────────────────────────────────────────

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], operator.add]
    hcp_id: str | None


# ── Nodes ─────────────────────────────────────────────────────────────────────

def agent_node(state: AgentState) -> AgentState:
    """
    Main agent reasoning node – placeholder.
    Replace with LLM call via groq_service when implementing.
    """
    last_message = state["messages"][-1].content if state["messages"] else ""
    reply = AIMessage(content=f"[Agent placeholder] You said: {last_message}")
    return {"messages": [reply]}


# ── Graph ─────────────────────────────────────────────────────────────────────

def build_agent_graph() -> StateGraph:
    """Build and compile the LangGraph agent graph."""
    builder = StateGraph(AgentState)

    builder.add_node("agent", agent_node)
    builder.set_entry_point("agent")
    builder.add_edge("agent", END)

    return builder.compile()


# Compiled graph instance
hcp_crm_agent = build_agent_graph()

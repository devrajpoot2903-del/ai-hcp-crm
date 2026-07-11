from langchain_core.messages import HumanMessage
from app.langgraph.graph import graph

# Simple in-memory thread tracking for this example
# In a real app, use checkpointer (like MemorySaver or PostgresSaver)
_conversation_states = {}

def run_agent(query: str, session_id: str = "default_session", hcp_id: str | None = None) -> str:
    """Run the agent for a given query, maintaining conversation state per session."""
    if session_id not in _conversation_states:
        _conversation_states[session_id] = {"messages": [], "current_hcp_id": hcp_id}
        
    state = _conversation_states[session_id]
    
    # Update HCP ID if provided
    if hcp_id:
        state["current_hcp_id"] = hcp_id
        
    # Add the new human message
    state["messages"].append(HumanMessage(content=query))
    
    # Run the graph
    new_state = graph.invoke(state)
    
    # Update our stored state
    _conversation_states[session_id] = new_state
    
    # Return the last AI message content
    return new_state["messages"][-1].content

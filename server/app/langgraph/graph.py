from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from app.langgraph.state import AgentState
from app.langgraph.nodes import agent_node, tools

# Create the graph builder
builder = StateGraph(AgentState)

# Add the nodes
builder.add_node("agent", agent_node)
builder.add_node("tools", ToolNode(tools))

# Add edges
builder.add_edge(START, "agent")

# Use prebuilt tools_condition to route to tools if tool calls exist, else END
builder.add_conditional_edges(
    "agent",
    tools_condition,
)

# Return to agent after tool execution
builder.add_edge("tools", "agent")

# Compile the graph
graph = builder.compile()

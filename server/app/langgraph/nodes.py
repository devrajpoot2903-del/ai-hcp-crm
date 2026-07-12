from langchain_core.messages import SystemMessage, AIMessage
from langchain_groq import ChatGroq
from app.config.settings import settings
from app.langgraph.state import AgentState
from app.langgraph.tools import (
    log_interaction,
    edit_interaction,
    search_interactions,
    get_hcp_details,
    generate_followup_summary,
)
from app.langgraph.prompts.system_prompt import SYSTEM_PROMPT

# List of tools to bind to the model
tools = [
    log_interaction,
    edit_interaction,
    search_interactions,
    get_hcp_details,
    generate_followup_summary,
]

def agent_node(state: AgentState):
    """The agent node that invokes the LLM."""
    messages = state["messages"]
    

    # Ensure system prompt is present
    if not messages or not isinstance(messages[0], SystemMessage):
        messages = [SystemMessage(content=SYSTEM_PROMPT)] + messages

    # Validate API key
    groq_key = settings.GROQ_API_KEY
    if not groq_key:
        return {"messages": [AIMessage(content="Error: GROQ_API_KEY is missing.")]}

    # Handle decommissioned models silently
    model_name = settings.GROQ_MODEL
    if model_name == "llama3-70b-8192":
        model_name = "llama-3.3-70b-versatile"

    try:
        # Initialize the model (using ChatGroq)
        llm = ChatGroq(
            api_key=groq_key,
            model=model_name
        )
        llm_with_tools = llm.bind_tools(tools)
        response = llm_with_tools.invoke(messages)
        return {"messages": [response]}
    except Exception as e:
        return {"messages": [AIMessage(content=f"Error communicating with AI provider: {str(e)}")]}

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
        
    if not settings.GROQ_API_KEY or settings.GROQ_API_KEY == "dummy_key_for_build":
        # Fallback for when no key is provided
        return {"messages": [AIMessage(content="[Mock Agent] I am ready! However, the GROQ_API_KEY is not configured yet, so I cannot process complex commands. Please set it in your .env file.")]}

    try:
        # Initialize the model (using ChatGroq)
        llm = ChatGroq(
            api_key=settings.GROQ_API_KEY,
            model=settings.GROQ_MODEL
        )
        llm_with_tools = llm.bind_tools(tools)
        response = llm_with_tools.invoke(messages)
        return {"messages": [response]}
    except Exception as e:
        return {"messages": [AIMessage(content=f"Error communicating with AI provider: {str(e)}")]}

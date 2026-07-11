from langchain_core.tools import tool
from langchain_groq import ChatGroq
from app.config.settings import settings

@tool
def generate_followup_summary(notes: str) -> str:
    """Use the LLM to generate follow-up recommendations, next meeting agenda, key discussion points, and action items from notes."""
    # Provide a structured prompt to the LLM
    prompt = (
        "Based on the following interaction notes, generate a structured follow-up summary.\n"
        "Include these sections:\n"
        "1. Key Discussion Points\n"
        "2. Action Items\n"
        "3. Follow-up Recommendations\n"
        "4. Next Meeting Agenda\n\n"
        f"Notes:\n{notes}"
    )
    
    try:
        if settings.GROQ_API_KEY:
            # We initialize a separate instance for this specific ad-hoc task
            llm = ChatGroq(
                api_key=settings.GROQ_API_KEY,
                model=settings.GROQ_MODEL
            )
            response = llm.invoke(prompt)
            return response.content
        else:
            # Fallback placeholder if no API key is set
            return (
                "1. Key Discussion Points: Discussed standard metrics and recent developments.\n"
                "2. Action Items: Send follow-up email with detailed report.\n"
                "3. Follow-up Recommendations: Schedule next meeting in 2 weeks.\n"
                "4. Next Meeting Agenda: Review impact of recent report and discuss strategic goals.\n"
                "(Note: Set GROQ_API_KEY to enable real AI summaries.)"
            )
    except Exception as e:
        return f"Failed to generate summary: {str(e)}"

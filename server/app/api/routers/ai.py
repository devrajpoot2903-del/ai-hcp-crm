from fastapi import APIRouter
from pydantic import BaseModel
from app.langgraph.agent import run_agent

router = APIRouter(prefix="/ai", tags=["AI"])


class AgentRequest(BaseModel):
    query: str
    hcp_id: str | None = None
    session_id: str = "default_session"


class AgentResponse(BaseModel):
    response: str
    agent: str = "hcp_crm_agent"


@router.post("/chat", response_model=AgentResponse)
async def chat_with_agent(payload: AgentRequest):
    """Run the LangGraph agent."""
    response_text = run_agent(
        query=payload.query, 
        session_id=payload.session_id, 
        hcp_id=payload.hcp_id
    )
    
    return AgentResponse(
        response=response_text,
    )

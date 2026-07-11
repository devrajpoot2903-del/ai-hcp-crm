from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["AI"])


class AgentRequest(BaseModel):
    query: str
    hcp_id: str | None = None


class AgentResponse(BaseModel):
    response: str
    agent: str = "hcp_crm_agent"


@router.post("/chat", response_model=AgentResponse)
async def chat_with_agent(payload: AgentRequest):
    """Run the LangGraph agent – placeholder."""
    return AgentResponse(
        response=f"[Placeholder] Received: {payload.query}",
    )

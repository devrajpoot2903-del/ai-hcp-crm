from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class InteractionBase(BaseModel):
    hcp_id: str
    interaction_type: str
    date: str
    time: Optional[str] = None
    duration: Optional[int] = None
    topic: str
    summary: Optional[str] = None
    key_takeaways: Optional[str] = None
    follow_up_required: bool = False
    priority: str = "Medium"
    outcome: str = "Neutral"
    next_action: Optional[str] = None


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(BaseModel):
    interaction_type: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    duration: Optional[int] = None
    topic: Optional[str] = None
    summary: Optional[str] = None
    key_takeaways: Optional[str] = None
    follow_up_required: Optional[bool] = None
    priority: Optional[str] = None
    outcome: Optional[str] = None
    next_action: Optional[str] = None


class InteractionResponse(InteractionBase):
    id: str
    status: str
    created_at: datetime
    
    # Extra fields for frontend convenience (optional)
    hcp_name: Optional[str] = None
    hcp_specialty: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

from typing import List
from pydantic import BaseModel
from app.schemas.interaction import InteractionResponse


class DashboardStats(BaseModel):
    totalHCPs: int
    todayInteractions: int
    pendingFollowUps: int
    thisWeekMeetings: int


class DashboardActivity(BaseModel):
    id: str
    hcp: str
    specialty: str
    type: str
    time: str
    outcome: str
    topic: str
    priority: str


class DashboardResponse(BaseModel):
    stats: DashboardStats
    recentActivity: List[DashboardActivity]

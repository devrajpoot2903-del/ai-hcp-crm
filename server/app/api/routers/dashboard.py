from fastapi import APIRouter
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/", response_model=DashboardResponse)
async def get_dashboard():
    """Get dashboard aggregated statistics and recent activity."""
    return DashboardService.get_dashboard_data()

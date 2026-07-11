from datetime import datetime, timedelta
from app.schemas.dashboard import DashboardResponse, DashboardStats, DashboardActivity
from app.services.hcp_service import _hcps
from app.services.interaction_service import _interactions


class DashboardService:
    @staticmethod
    def get_dashboard_data() -> DashboardResponse:
        total_hcps = len(_hcps)
        
        today_str = datetime.now().strftime("%Y-%m-%d")
        
        today_interactions = 0
        pending_follow_ups = 0
        
        # Calculate recent activity
        sorted_ints = sorted(_interactions.values(), key=lambda x: x["created_at"], reverse=True)
        recent_activity_list = []
        
        for i in sorted_ints:
            if i["date"] == today_str:
                today_interactions += 1
            if i.get("follow_up_required") and i.get("status") == "Pending":
                pending_follow_ups += 1
                
        # Get up to 5 recent interactions
        for i in sorted_ints[:5]:
            hcp = _hcps.get(i["hcp_id"])
            hcp_name = hcp["name"] if hcp else "Unknown"
            hcp_specialty = hcp["specialty"] if hcp else "Unknown"
            
            recent_activity_list.append(
                DashboardActivity(
                    id=i["id"],
                    hcp=hcp_name,
                    specialty=hcp_specialty,
                    type=i["interaction_type"],
                    time=i["date"], # simplified time display
                    outcome=i["outcome"],
                    topic=i["topic"],
                    priority=i["priority"]
                )
            )
            
        stats = DashboardStats(
            totalHCPs=total_hcps,
            todayInteractions=today_interactions,
            pendingFollowUps=pending_follow_ups,
            thisWeekMeetings=len(sorted_ints) # mock this week
        )
        
        return DashboardResponse(
            stats=stats,
            recentActivity=recent_activity_list
        )

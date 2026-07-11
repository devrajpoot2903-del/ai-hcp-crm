from typing import Optional
from datetime import datetime
from langchain_core.tools import tool
from app.services.hcp_service import HCPService
from app.services.interaction_service import InteractionService
from app.schemas.interaction import InteractionCreate

@tool
def log_interaction(
    doctor_name: str,
    interaction_type: str,
    summary: str,
    outcome: str = "Neutral",
    follow_up_required: bool = False,
    follow_up_date: Optional[str] = None
) -> str:
    """Save an interaction using existing backend service."""
    # 1. Find the HCP by name
    hcps = HCPService.get_all_hcps()
    matched_hcp = next((h for h in hcps if doctor_name.lower() in h.name.lower()), None)
    
    if not matched_hcp:
        return f"Failed: Could not find HCP '{doctor_name}' in the system."
        
    # 2. Prepare interaction data
    today = datetime.now().strftime("%Y-%m-%d")
    
    int_in = InteractionCreate(
        hcp_id=matched_hcp.id,
        interaction_type=interaction_type,
        date=today,
        topic=summary[:50] + "..." if len(summary) > 50 else summary,  # derive topic
        summary=summary,
        outcome=outcome,
        follow_up_required=follow_up_required,
        # note: follow_up_date is collected but the schema uses 'next_action' or just follow_up_required
        next_action=f"Follow-up on {follow_up_date}" if follow_up_date else None
    )
    
    # 3. Save
    try:
        new_int = InteractionService.create_interaction(int_in)
        return f"Success: Logged interaction for {matched_hcp.name} (ID: {new_int.id})"
    except Exception as e:
        return f"Error logging interaction: {str(e)}"

from typing import Optional
from langchain_core.tools import tool
from app.services.interaction_service import InteractionService
from app.schemas.interaction import InteractionUpdate

@tool
def edit_interaction(
    interaction_id: str,
    summary: Optional[str] = None,
    followup: Optional[bool] = None,
    outcome: Optional[str] = None
) -> str:
    """Edit an existing interaction."""
    # Build update payload
    update_data = {}
    if summary is not None:
        update_data["summary"] = summary
    if followup is not None:
        update_data["follow_up_required"] = followup
    if outcome is not None:
        update_data["outcome"] = outcome
        
    if not update_data:
        return "No fields provided to update."

    int_update = InteractionUpdate(**update_data)
    
    try:
        updated_int = InteractionService.update_interaction(interaction_id, int_update)
        return f"Success: Updated interaction {updated_int.id}. Current Outcome: {updated_int.outcome}, Follow-up: {updated_int.follow_up_required}."
    except Exception as e:
        return f"Error updating interaction: {str(e)}"

import uuid
from datetime import datetime
from typing import List
from fastapi import HTTPException
from app.schemas.interaction import InteractionCreate, InteractionUpdate, InteractionResponse
from app.services.hcp_service import _hcps

# In-memory mock data
_interactions = {}

# Populate some initial fake data for one of the HCPs
if _hcps:
    first_hcp_id = list(_hcps.keys())[0]
    int_id = f"int-{uuid.uuid4()}"
    _interactions[int_id] = {
        "id": int_id,
        "hcp_id": first_hcp_id,
        "interaction_type": "Meeting",
        "date": "2024-01-15",
        "time": "10:00",
        "duration": 45,
        "topic": "Cardiology Research Update",
        "summary": "Discussed latest cardiovascular research.",
        "key_takeaways": "Interested in scheduling a follow-up.",
        "follow_up_required": True,
        "priority": "High",
        "outcome": "Successful",
        "next_action": "Send report",
        "status": "Pending",
        "created_at": datetime.now()
    }


def _enrich_interaction(interaction: dict) -> dict:
    """Helper to attach HCP details to interaction response."""
    enriched = interaction.copy()
    hcp = _hcps.get(interaction["hcp_id"])
    if hcp:
        enriched["hcp_name"] = hcp["name"]
        enriched["hcp_specialty"] = hcp["specialty"]
    return enriched


class InteractionService:
    @staticmethod
    def get_all_interactions() -> List[InteractionResponse]:
        # Sort by most recent
        sorted_ints = sorted(_interactions.values(), key=lambda x: x["created_at"], reverse=True)
        return [InteractionResponse(**_enrich_interaction(i)) for i in sorted_ints]

    @staticmethod
    def get_interaction(interaction_id: str) -> InteractionResponse:
        interaction = _interactions.get(interaction_id)
        if not interaction:
            raise HTTPException(status_code=404, detail="Interaction not found")
        return InteractionResponse(**_enrich_interaction(interaction))

    @staticmethod
    def create_interaction(int_in: InteractionCreate) -> InteractionResponse:
        if int_in.hcp_id not in _hcps:
            raise HTTPException(status_code=422, detail="HCP does not exist")
            
        int_id = f"int-{uuid.uuid4()}"
        new_int = int_in.model_dump()
        new_int["id"] = int_id
        new_int["status"] = "Pending" if new_int.get("follow_up_required") else "Completed"
        new_int["created_at"] = datetime.now()
        
        _interactions[int_id] = new_int
        return InteractionResponse(**_enrich_interaction(new_int))

    @staticmethod
    def update_interaction(interaction_id: str, int_in: InteractionUpdate) -> InteractionResponse:
        interaction = _interactions.get(interaction_id)
        if not interaction:
            raise HTTPException(status_code=404, detail="Interaction not found")
        
        update_data = int_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            interaction[key] = value
            
        # Update status if follow_up changed
        if "follow_up_required" in update_data:
            interaction["status"] = "Pending" if update_data["follow_up_required"] else "Completed"
            
        _interactions[interaction_id] = interaction
        return InteractionResponse(**_enrich_interaction(interaction))

    @staticmethod
    def delete_interaction(interaction_id: str) -> None:
        if interaction_id in _interactions:
            del _interactions[interaction_id]

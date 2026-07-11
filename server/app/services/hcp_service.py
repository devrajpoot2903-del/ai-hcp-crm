import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException
from app.schemas.hcp import HCPCreate, HCPUpdate, HCPResponse

# In-memory mock data
_hcps = {}

# Populate some initial fake data
initial_hcps = [
    {"name": "Dr. Sarah Johnson", "specialty": "Cardiologist", "hospital": "City Medical Center", "email": "sarah.j@example.com"},
    {"name": "Dr. Michael Chen", "specialty": "Oncologist", "hospital": "Regional Cancer Institute", "email": "m.chen@example.com"}
]

for h in initial_hcps:
    hcp_id = f"hcp-{uuid.uuid4()}"
    _hcps[hcp_id] = {
        "id": hcp_id,
        "name": h["name"],
        "specialty": h["specialty"],
        "hospital": h["hospital"],
        "email": h["email"],
        "created_at": datetime.now()
    }


class HCPService:
    @staticmethod
    def get_all_hcps() -> List[HCPResponse]:
        return [HCPResponse(**hcp) for hcp in _hcps.values()]

    @staticmethod
    def get_hcp(hcp_id: str) -> HCPResponse:
        hcp = _hcps.get(hcp_id)
        if not hcp:
            raise HTTPException(status_code=404, detail="HCP not found")
        return HCPResponse(**hcp)

    @staticmethod
    def create_hcp(hcp_in: HCPCreate) -> HCPResponse:
        hcp_id = f"hcp-{uuid.uuid4()}"
        new_hcp = hcp_in.model_dump()
        new_hcp["id"] = hcp_id
        new_hcp["created_at"] = datetime.now()
        _hcps[hcp_id] = new_hcp
        return HCPResponse(**new_hcp)

    @staticmethod
    def update_hcp(hcp_id: str, hcp_in: HCPUpdate) -> HCPResponse:
        hcp = _hcps.get(hcp_id)
        if not hcp:
            raise HTTPException(status_code=404, detail="HCP not found")
        
        update_data = hcp_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            hcp[key] = value
            
        _hcps[hcp_id] = hcp
        return HCPResponse(**hcp)

    @staticmethod
    def delete_hcp(hcp_id: str) -> None:
        if hcp_id not in _hcps:
            raise HTTPException(status_code=404, detail="HCP not found")
        del _hcps[hcp_id]

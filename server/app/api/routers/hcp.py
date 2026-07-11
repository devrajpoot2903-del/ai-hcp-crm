from typing import List
from fastapi import APIRouter
from app.schemas.hcp import HCPCreate, HCPUpdate, HCPResponse
from app.services.hcp_service import HCPService

router = APIRouter(prefix="/hcp", tags=["HCP"])


@router.get("/", response_model=List[HCPResponse])
async def list_hcps():
    """List all HCPs."""
    return HCPService.get_all_hcps()


@router.get("/{id}", response_model=HCPResponse)
async def get_hcp(id: str):
    """Get a single HCP."""
    return HCPService.get_hcp(id)


@router.post("/", response_model=HCPResponse, status_code=201)
async def create_hcp(hcp_in: HCPCreate):
    """Create a new HCP."""
    return HCPService.create_hcp(hcp_in)


@router.put("/{id}", response_model=HCPResponse)
async def update_hcp(id: str, hcp_in: HCPUpdate):
    """Update an HCP."""
    return HCPService.update_hcp(id, hcp_in)


@router.delete("/{id}", status_code=204)
async def delete_hcp(id: str):
    """Delete an HCP."""
    HCPService.delete_hcp(id)

from fastapi import APIRouter

router = APIRouter(prefix="/hcp", tags=["HCP"])


@router.get("/")
async def list_hcps():
    """List all HCPs – placeholder."""
    return {"data": [], "message": "HCP list endpoint – not yet implemented"}


@router.get("/{hcp_id}")
async def get_hcp(hcp_id: str):
    """Get a single HCP – placeholder."""
    return {"data": None, "hcp_id": hcp_id}

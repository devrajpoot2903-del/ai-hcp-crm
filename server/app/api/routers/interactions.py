from fastapi import APIRouter

router = APIRouter(prefix="/interactions", tags=["Interactions"])


@router.get("/")
async def list_interactions():
    """List all interactions – placeholder."""
    return {"data": [], "message": "Interactions list endpoint – not yet implemented"}

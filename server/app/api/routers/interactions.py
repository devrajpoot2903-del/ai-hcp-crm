from typing import List
from fastapi import APIRouter
from app.schemas.interaction import InteractionCreate, InteractionUpdate, InteractionResponse
from app.services.interaction_service import InteractionService

router = APIRouter(prefix="/interactions", tags=["Interactions"])


@router.get("/", response_model=List[InteractionResponse])
async def list_interactions():
    """List all interactions."""
    return InteractionService.get_all_interactions()


@router.get("/{id}", response_model=InteractionResponse)
async def get_interaction(id: str):
    """Get a single interaction."""
    return InteractionService.get_interaction(id)


@router.post("/", response_model=InteractionResponse, status_code=201)
async def create_interaction(int_in: InteractionCreate):
    """Create a new interaction."""
    return InteractionService.create_interaction(int_in)


@router.put("/{id}", response_model=InteractionResponse)
async def update_interaction(id: str, int_in: InteractionUpdate):
    """Update an interaction."""
    return InteractionService.update_interaction(id, int_in)


@router.delete("/{id}", status_code=204)
async def delete_interaction(id: str):
    """Delete an interaction."""
    InteractionService.delete_interaction(id)

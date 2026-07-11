from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import health, hcp, interactions, ai
from app.config.settings import settings

app = FastAPI(
    title="AI HCP CRM API",
    version="0.1.0",
    description="AI-powered Healthcare Provider CRM backend",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(hcp.router, prefix="/api/v1")
app.include_router(interactions.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")

import uuid
from sqlalchemy import String, Integer, Boolean, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.connection import Base


class Interaction(Base):
    """Interaction ORM model."""

    __tablename__ = "interactions"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    hcp_id: Mapped[str] = mapped_column(String(36), ForeignKey("hcps.id"), nullable=False)
    interaction_type: Mapped[str] = mapped_column(String(50), nullable=False)
    date: Mapped[str] = mapped_column(String(20), nullable=False)
    time: Mapped[str] = mapped_column(String(20), nullable=True)
    duration: Mapped[int] = mapped_column(Integer, nullable=True)
    topic: Mapped[str] = mapped_column(String(255), nullable=False)
    summary: Mapped[str] = mapped_column(String, nullable=True)
    key_takeaways: Mapped[str] = mapped_column(String, nullable=True)
    follow_up_required: Mapped[bool] = mapped_column(Boolean, default=False)
    priority: Mapped[str] = mapped_column(String(20), default="Medium")
    outcome: Mapped[str] = mapped_column(String(50), default="Neutral")
    next_action: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="Completed")
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationship to HCP
    hcp = relationship("HCP", backref="interactions")

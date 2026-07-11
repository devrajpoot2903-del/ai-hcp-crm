from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class HCPBase(BaseModel):
    name: str
    specialty: Optional[str] = None
    email: Optional[str] = None


class HCPCreate(HCPBase):
    pass


class HCPRead(HCPBase):
    id: str
    created_at: datetime

    model_config = {"from_attributes": True}

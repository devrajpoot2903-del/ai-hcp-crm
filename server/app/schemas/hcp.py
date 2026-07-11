from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class HCPBase(BaseModel):
    name: str
    specialty: Optional[str] = None
    hospital: Optional[str] = None
    email: Optional[str] = None


class HCPCreate(HCPBase):
    pass


class HCPUpdate(BaseModel):
    name: Optional[str] = None
    specialty: Optional[str] = None
    hospital: Optional[str] = None
    email: Optional[str] = None


class HCPResponse(HCPBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

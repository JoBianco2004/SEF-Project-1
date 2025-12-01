# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: user.py
# Description: Classes used to validate data collected from user

from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, date
from typing import Optional

# User data collection model
class UserCreate(BaseModel):
    role: str 
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    dob: Optional[date] = None

    @field_validator("password")
    def validate_password(cls, v):
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password too long")
        return v

# Public user model (returned by API)
class UserPublic(BaseModel):
    id: int
    role: str
    first_name: str
    last_name: str
    email: EmailStr
    date_created: datetime
    dob: Optional[date]

# User login model
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# New: User update model - all fields optional for partial updates
class UserUpdate(BaseModel):
    role: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    dob: Optional[date] = None

    @field_validator("password")
    def validate_password(cls, v):
        if v and len(v.encode("utf-8")) > 72:
            raise ValueError("Password too long")
        return v

# Pydantic config to allow attribute access (optional, if you use from_attributes)
model_config = {"from_attributes": True}

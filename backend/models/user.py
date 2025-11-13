from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, date
from typing import Optional

#user data collection
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

#public user
class UserPublic(BaseModel):
    id: int
    role: str
    first_name: str
    last_name: str
    email: EmailStr
    date_created: datetime
    dob: Optional[date]


#user log-in
class UserLogin(BaseModel):
    email: EmailStr
    password: str

#pydantic attribute model instance
model_config = {"from_attributes": True}
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from datetime import date
from typing import Optional
from ..database.userDB import User, get_session

router = APIRouter()


#user data collection
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password_hash: str
    dob: Optional[date] = None



#create user, endpoint
@router.post("/user/create", response_model=User, status_code=201)
def create_user(user_in: UserCreate, session: Session = Depends(get_session)):
    user = User(**user_in.dict())
    session.add(user)
    try:
        session.commit()
        session.refresh(user)
        return user
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail="Invalid data Entry")


#read all users
@router.get("/user/read", response_model=list[User])
def read_users(skip: int = 0, limit: int = 10, session: Session = Depends(get_session)):
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return users


#get user by ID
@router.get("/user/{user_id}", response_model=User)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    return user


#update user info
@router.put("/user/{user_id}", response_model=User)
def update_user(user_id: int, user_data: UserCreate, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")

    #update user attributes
    update_data = user_data.dict(exclude_unset=True)
    for field, value in user_data.model_dump().items():
        setattr(user, field, value)

    session.commit()
    session.refresh(user)
    return user


#delete user
@router.delete("/user/{user_id}", response_model=User)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    session.delete(user)
    session.commit()
    return user



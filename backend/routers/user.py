# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: user.py
# Description: CRUD for user log-in, create account, delete account, update account, and read users

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from ..utils.security import hash_password, verify_password
from ..database.userDB import User, get_session
from ..models.user import UserCreate, UserPublic, UserLogin, UserUpdate
import logging

router = APIRouter(prefix="/user", tags=["user"])

@router.post("/create", response_model=UserPublic, status_code=201)
def create_user(user_in: UserCreate, session: Session = Depends(get_session)):
    hashed = hash_password(user_in.password)
    user = User(**user_in.model_dump(exclude={"password"}), password_hash=hashed)
    session.add(user)
    try:
        session.commit()
        session.refresh(user)
        return UserPublic.model_validate(user.model_dump())
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=409, detail="Email is already associated with another account")

@router.post("/login")
def login(user_in: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or Password")
    return {
        "msg": "Login Successful",
        "user_id": user.id,
        "role": user.role  
    }

@router.get("/read", response_model=list[UserPublic])
def read_users(skip: int = 0, limit: int = 1000, session: Session = Depends(get_session)):
    logging.info(f"read_users called with skip={skip} and limit={limit}")
    try:
        users = session.exec(select(User).offset(skip).limit(limit)).all()
        logging.info(f"Fetched {len(users)} users")
        return users
    except Exception as e:
        logging.error(f"Failed to fetch users: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{user_id}", response_model=UserPublic)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    return UserPublic.model_validate(user.model_dump())

@router.put("/{user_id}", response_model=UserPublic)
def update_user(user_id: int, user_data: UserUpdate, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")

    update_data = user_data.model_dump(exclude_unset=True)

    if "password" in update_data:
        update_data["password_hash"] = hash_password(update_data.pop("password"))

    for field, value in update_data.items():
        setattr(user, field, value)

    session.commit()
    session.refresh(user)
    return UserPublic.model_validate(user.model_dump())

@router.delete("/{user_id}", response_model=UserPublic)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    session.delete(user)
    session.commit()
    return UserPublic.model_validate(user.model_dump())

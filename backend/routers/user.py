from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from ..utils.security import hash_password, verify_password
from ..database.userDB import User, get_session
from ..models.user import UserCreate, UserPublic, UserLogin

router = APIRouter(prefix="/user", tags=["user"])


#create user, endpoint
@router.post("/user/create", response_model=UserPublic, status_code=201)
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

#log-in
@router.post("/user/login")
def login(user_in: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or Password")
    return {"msg": "Login Successful", "user_id": user.id}


#read all users
@router.get("/user/read", response_model=list[UserPublic])
def read_users(skip: int = 0, limit: int = 10,
                session: Session = Depends(get_session)):
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return users


#get user by ID
@router.get("/user/{user_id}", response_model=UserPublic)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    return UserPublic.model_validate(user.model_dump())


#update user info
@router.put("/user/{user_id}", response_model=UserPublic)
def update_user(user_id: int, user_data: UserCreate,
                session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")

    #update user attributes
    update_data = user_data.model_dump(exclude_unset=True)
    for field, value in user_data.model_dump().items():
        setattr(user, field, value)

    session.commit()
    session.refresh(user)
    return UserPublic.model_validate(user.model_dump())


#delete user
@router.delete("/user/{user_id}", response_model=UserPublic)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User does NOT exist")
    session.delete(user)
    session.commit()
    return UserPublic.model_validate(user.model_dump())



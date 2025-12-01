from sqlmodel import SQLModel, Field, Session, create_engine, select
from typing import Optional, List
from datetime import datetime, date
from pydantic import EmailStr
import json

# ------------------- User model -------------------

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    role: str = Field(default="student", index=True)
    first_name: str
    last_name: str
    email: EmailStr = Field(unique=True, index=True)
    password_hash: str
    date_created: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    dob: Optional[date] = Field(default=None, nullable=True)

# ------------------- Chat model -------------------

class Chat(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    user_id: int = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    chat_data: str  # JSON string storing chat messages

# ------------------- Database setup -------------------

engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

# ------------------- Chat helper functions -------------------

def save_chat(user_id: int, messages: List[dict], session: Session, chat_id: Optional[int] = None) -> Chat:
    """
    Save a new chat or update existing one.
    - messages: list of dicts (chat messages)
    - chat_id: if given, updates the existing chat; otherwise, creates new.
    """
    chat_json = json.dumps(messages)
    if chat_id:
        chat = session.get(Chat, chat_id)
        if not chat:
            raise ValueError("Chat not found")
        chat.chat_data = chat_json
        chat.created_at = datetime.utcnow()
    else:
        chat = Chat(user_id=user_id, chat_data=chat_json)
        session.add(chat)
    session.commit()
    session.refresh(chat)
    return chat

def get_chats_for_user(user_id: int, session: Session) -> List[Chat]:
    """Return all chats for a user, newest first."""
    statement = select(Chat).where(Chat.user_id == user_id).order_by(Chat.created_at.desc())
    results = session.exec(statement)
    return results.all()

def get_chat_by_id(chat_id: int, session: Session) -> Optional[Chat]:
    """Return a single chat by its ID."""
    return session.get(Chat, chat_id)

def delete_chat(chat_id: int, session: Session) -> bool:
    """Delete chat by ID. Returns True if deleted successfully."""
    chat = session.get(Chat, chat_id)
    if chat:
        session.delete(chat)
        session.commit()
        return True
    return False

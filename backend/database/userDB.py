# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: userDB.py
# Description: This file serves as the creation of a user data base to store user's log-
# in credentials.

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

from sqlmodel import SQLModel, Field, Session, create_engine
from typing import Optional
from datetime import datetime, date
from pydantic import EmailStr

#database class for user
class User(SQLModel, table = True):
    id: int = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    role: str = Field(default="student", index=True)
    first_name: str
    last_name: str
    email: EmailStr = Field(unique=True, index=True)
    password_hash: str
    date_created: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    dob: Optional[date] = Field(default=None, nullable=True)


#create SQLite engine
engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)

#dependency: get the session
def get_session():
    with Session(engine) as session:
        yield session


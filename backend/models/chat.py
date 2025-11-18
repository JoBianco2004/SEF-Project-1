# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: chat.py
# Description: Holds classes for the chat function

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

from pydantic import BaseModel


class ChatMessage(BaseModel):
    content: str

class ChatResponse(BaseModel):
    reply: str
# backend/routers/chat.py
from fastapi import APIRouter, Depends, HTTPException, Header
from typing import List, Dict
from ..models.chat import ChatMessage, ChatResponse
from ..services.llm import chat as llm_chat

router = APIRouter()


conversation_history: Dict[int, List[Dict[str, str]]] = {}

#get user id
async def get_user_id(x_user_id: int = Header(None, alias="X-User-ID")):
    if x_user_id is None:
        raise HTTPException(status_code=401, detail="Missing X-User-ID header")
    return x_user_id

#chat endpoint
@router.post("/", response_model=ChatResponse)
async def chat_endpoint(
    message: ChatMessage,
    user_id: int = Depends(get_user_id)
):
    # First time chat, start with a system prompt (TinyLlama requires it)
    if user_id not in conversation_history:
        conversation_history[user_id] = [
            {"role": "system", "content": "You are a friendly and helpful student assistant. Answer clearly and concisely."}
        ]

    history = conversation_history[user_id]

    #new message 
    history.append({"role": "user", "content": message.content})

    #AI generated response
    try:
        reply = llm_chat(history)
    except Exception as e:
        print(f"\nLLM ERROR: {e}\n")
        raise HTTPException(status_code=500, detail="AI unavailable")

    #save AI response
    history.append({"role": "assistant", "content": reply})

    return ChatResponse(reply=reply)


#get ful history endpoint
@router.get("/history")
async def get_chat_history(user_id: int = Depends(get_user_id)):
    return conversation_history.get(user_id, [])
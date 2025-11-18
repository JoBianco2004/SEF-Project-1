# main python backend file
from fastapi import FastAPI
from .routers import tools, user, rag
from .routers.chat import router as chat_router
from .routers.chat import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(user.router)
app.include_router(rag.router)
app.include_router(tools.router)
app.include_router(user_router)
app.include_router(chat_router, prefix="/chat", tags=["chat"])

# front page
@app.get("/")
def read_root():
    return {"message": "Backend is alive!"}

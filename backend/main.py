from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import tools, user, rag
from .routers.chat import router as chat_router

app = FastAPI()

# Allow all origins for development (change in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific origins later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router)          # User-related routes
app.include_router(rag.router)
app.include_router(tools.router)
app.include_router(chat_router, prefix="/chat", tags=["chat"])  # Chat-related routes

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Backend is alive!"}

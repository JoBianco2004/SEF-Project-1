# main python backend file
from fastapi import FastAPI
# other files
from .routers import user

app = FastAPI()

app.include_router(user.router)

@app.get("/")
def read_root():
    return {"message": "Backend is real!"}




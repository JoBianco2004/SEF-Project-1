# main python backend file
from fastapi import FastAPI
# other files
from .routers import user
from rag_functions import answer, grade, common_questions, generate_quiz
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(user.router)

@app.get("/")
def read_root():
    return {"message": "Backend is alive!"}

@app.get("/common_questions")
def get_common_questions():
    return common_questions()

@app.get("/generate_quiz")
def get_quiz():
    return generate_quiz()

@app.get("/answer")
def get_answer(question: str):
    return answer(question)

@app.post("/grade")
def post_grade(submission: str):
    return grade(submission)

from fastapi import APIRouter
from ..services import calculator, rag_functions


router = APIRouter()

#this is just a test (we could keep it lol)
@router.put("/calculator/{num1}/{num2}/{selection}")
def calculation(num1: str, num2: str, selection: str):
    return {"result": calculator.calculate(num1, num2, selection)}

@router.get("/common_questions")
def get_common_questions():
    return rag_functions.common_questions()

@router.get("/generate_quiz")
def get_quiz():
    return rag_functions.generate_quiz()

@router.get("/answer")
def get_answer(question: str):
    return rag_functions.answer(question)

@router.post("/grade")
def post_grade(submission: str):
    return rag_functions.grade(submission)

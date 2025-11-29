# Author: Joey Lo Blanco 
# Date: 11/18/25 -Documented, not created
# File_Name: rag.py
# Description: Placeholder endpoint to test frontend

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

from fastapi import APIRouter
from ..services import rag_functions

router = APIRouter()


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

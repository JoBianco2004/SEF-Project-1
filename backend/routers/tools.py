from fastapi import APIRouter
from ..services import calculator

router = APIRouter()


#this is just a test (we could keep it lol)
@router.put("/calculator/{num1}/{num2}/{selection}")
def calculation(num1: str, num2: str, selection: str):
    return {"result": calculator.calculate(num1, num2, selection)}

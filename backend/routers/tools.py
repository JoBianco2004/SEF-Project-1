# Author: Daniel Valdes
# Date: 11/18/25 -Documented, not created
# File_Name: tools.py
# Description: calculator endpoint

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

from fastapi import APIRouter
from ..services import calculator

router = APIRouter(prefix="/tools", tags=["tools"])


#this is just a test (we could keep it lol)
@router.put("/calculator/{num1}/{num2}/{selection}")
def calculation(num1: str, num2: str, selection: str):
    return {"result": calculator.calculate(num1, num2, selection)}

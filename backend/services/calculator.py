# Author: Daniel Valdes
# Date: 10/04/25 
# File_Name: calculator.py
# Description: Simple calculator operations to test endpoint (might not be added in end product)

#-------------------------------------------------------------------------------------------------
# Modified: 
#-------------------------------------------------------------------------------------------------

# calculator logic
def calculate(num1: str, num2: str, selection: str) -> int:
    n1, n2, sel = int(num1), int(num2), int(selection)
    if sel == 1: return n1 + n2 # addition
    if sel == 2: return n1 - n2 # subtraction
    if sel == 3: return n1 * n2 # multiplication
    if sel == 4: return n1 // n2 if n2 != 0 else 0 # division
    return 0

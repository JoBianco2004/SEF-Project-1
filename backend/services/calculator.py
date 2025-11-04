#1 1/04/25
# Daniel Valdes
# This file contains a simple calculator code

# calculator logic
def calculate(num1: str, num2: str, selection: str) -> int:
    n1, n2, sel = int(num1), int(num2), int(selection)
    if sel == 1: return n1 + n2 # addition
    if sel == 2: return n1 - n2 # subtraction
    if sel == 3: return n1 * n2 # multiplication
    if sel == 4: return n1 // n2 if n2 != 0 else 0 # division
    return 0

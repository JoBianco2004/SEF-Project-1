def answer(question: str):
    return {"answer": f"This is a placeholder answer for: {question}"}

def grade(submission: str):
    return {"grade": "A", "feedback": "This is a placeholder grade function."}

def common_questions():
    return {"questions": ["What is RAG?", "How does AI help in learning?", "What is FastAPI?"]}

def generate_quiz():
    return {
        "quiz": [
            {
                "question": "What does RAG stand for?",
                "options": ["Random Access Gateway", "Retrieval Augmented Generation", "Rapid AI Generator"],
                "answer": 1
            },
            {
                "question": "Which library is used for backend?",
                "options": ["React", "FastAPI", "Vue"],
                "answer": 1
            }
        ]
    }

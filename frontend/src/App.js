import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(null);

  // ✅ Fetch root message
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  // ✅ Fetch common questions
  const loadQuestions = () => {
    fetch("http://127.0.0.1:8000/common_questions")
      .then(res => res.json())
      .then(data => setQuestions(data.questions));
  };

  // ✅ Fetch quiz
  const loadQuiz = () => {
    fetch("http://127.0.0.1:8000/generate_quiz")
      .then(res => res.json())
      .then(data => setQuiz(data.quiz));
  };

  // ✅ Get AI answer
  const askQuestion = async () => {
    const q = prompt("Enter your question:");
    const res = await fetch(`http://127.0.0.1:8000/answer?question=${encodeURIComponent(q)}`);
    const data = await res.json();
    setAnswer(data.answer);
  };

  // ✅ Grade submission (POST request)
  const sendGrade = async () => {
    const submission = prompt("Enter your submission:");
    const res = await fetch("http://127.0.0.1:8000/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission })
    });
    const data = await res.json();
    setGrade(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Project 1 Frontend</h1>
      <p>Backend says: {message}</p>

      <button onClick={loadQuestions}>Load Common Questions</button>
      <ul>{questions.map((q, i) => <li key={i}>{q}</li>)}</ul>

      <button onClick={loadQuiz}>Load Quiz</button>
      {quiz && quiz.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          <ul>
            {q.options.map((opt, j) => <li key={j}>{opt}</li>)}
          </ul>
        </div>
      ))}

      <button onClick={askQuestion}>Ask a Question</button>
      <p>{answer}</p>

      <button onClick={sendGrade}>Submit for Grading</button>
      {grade && (
        <div>
          <p>Grade: {grade.grade}</p>
          <p>Feedback: {grade.feedback}</p>
        </div>
      )}
    </div>
  );
}

export default App;

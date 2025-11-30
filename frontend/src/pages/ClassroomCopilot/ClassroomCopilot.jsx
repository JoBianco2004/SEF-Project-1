import { useState } from "react";
import "./ClassroomCopilot.css";
import { Link } from "react-router-dom";

function ClassroomCopilot() {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const [fileName, setFileName] = useState("");

  const loadQuestions = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/common_questions");
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      alert("Could not load questions. Backend might be offline.");
    }
  };

  const loadQuiz = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/generate_quiz");
      const data = await res.json();
      setQuiz(data.quiz || []);
    } catch {
      alert("Could not load quiz. Backend might be offline.");
    }
  };

  const askQuestion = async () => {
    if (!questionInput.trim()) return alert("Please enter a question.");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/answer?question=${encodeURIComponent(
          questionInput
        )}`
      );
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      alert("Could not get answer. Backend might be offline.");
    }
  };

  const sendGrade = async () => {
    if (!fileName) return alert("Please upload a file first.");
    try {
      const res = await fetch("http://127.0.0.1:8000/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission: fileName }),
      });
      const data = await res.json();
      setGrade(data);
    } catch {
      alert("Could not submit grade. Backend might be offline.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/student">Student Dashboard</Link>
        <Link to="/instructor">Instructor Dashboard</Link>
        <Link to="/chat">Chat</Link>
      </nav>

      <h1 className="title">AI Classroom Copilot</h1>

      <div className="input-bar">
        <input
          type="text"
          placeholder="Ask a question..."
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          className="input-text"
        />

        <button onClick={askQuestion} className="button">
          Ask
        </button>

        <label className="button button-upload">
          Upload
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) =>
              setFileName(e.target.files[0]?.name || "")
            }
          />
        </label>

        <button onClick={sendGrade} className="button">
          Grade
        </button>
      </div>

      {answer && (
        <p>
          <strong>Answer:</strong> {answer}
        </p>
      )}

      {grade && (
        <div>
          <p>
            <strong>Grade:</strong> {grade.grade}</p>
          <p>
            <strong>Feedback:</strong> {grade.feedback}
          </p>
        </div>
      )}

      <div className="bottom-buttons">
        <button onClick={loadQuestions} className="button">
          Common Questions
        </button>

        <button onClick={loadQuiz} className="button">
          Generate Quiz
        </button>
      </div>

      {questions.length > 0 && (
        <ul className="questions-list">
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      )}

      {quiz &&
        quiz.map((q, i) => (
          <div key={i} className="quiz-block">
            <p>
              <strong>{q.question}</strong>
            </p>
            <ul>
              {q.options.map((opt, j) => (
                <li key={j}>{opt}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default ClassroomCopilot;

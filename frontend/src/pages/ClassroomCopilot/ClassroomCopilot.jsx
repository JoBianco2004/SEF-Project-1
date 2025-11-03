import { useState, useEffect } from "react";
import './ClassroomCopilot.css';


function App() {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState(null);
  const [questionInput, setQuestionInput] = useState("");
  const [fileName, setFileName] = useState("");

  // ✅ Backend endpoints
  const loadQuestions = async () => {
    const res = await fetch("http://127.0.0.1:8000/common_questions");
    const data = await res.json();
    setQuestions(data.questions);
  };

  const loadQuiz = async () => {
    const res = await fetch("http://127.0.0.1:8000/generate_quiz");
    const data = await res.json();
    setQuiz(data.quiz);
  };

  const askQuestion = async () => {
    if (!questionInput.trim()) return alert("Please enter a question.");
    const res = await fetch(`http://127.0.0.1:8000/answer?question=${encodeURIComponent(questionInput)}`);
    const data = await res.json();
    setAnswer(data.answer);
  };

  const sendGrade = async () => {
    if (!fileName) return alert("Please upload a file first.");
    // Mock submission — in the future this will send file data
    const res = await fetch("http://127.0.0.1:8000/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission: fileName }),
    });
    const data = await res.json();
    setGrade(data);
  };

  // ✅ Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "sans-serif",
    backgroundColor: "#f5f7fa",
    color: "#333",
  };

  const inputBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const bottomButtonContainer = {
    display: "flex",
    gap: "20px",
    marginTop: "40px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "rgb(69, 62, 165)",
    color: "white",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "rgb(69, 62, 165)" }}>AI Classroom Copilot</h1>

      {/* Search bar and file upload */}
      <div style={inputBarStyle}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button onClick={askQuestion} style={buttonStyle}>Ask</button>
        <label
          style={{
            ...buttonStyle,
            backgroundColor: "rgb(69, 62, 165)",
            cursor: "pointer",
          }}
        >
          Upload
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFileName(e.target.files[0]?.name || "")}
          />
        </label>
        <button onClick={sendGrade} style={{ ...buttonStyle, backgroundColor: "rgb(69, 62, 165)" }}>
          Grade
        </button>
      </div>

      {/* Display answers and grades */}
      {answer && <p><strong>Answer:</strong> {answer}</p>}
      {grade && (
        <div>
          <p><strong>Grade:</strong> {grade.grade}</p>
          <p><strong>Feedback:</strong> {grade.feedback}</p>
        </div>
      )}

      {/* Bottom buttons */}
      <div style={bottomButtonContainer}>
        <button onClick={loadQuestions} style={buttonStyle}>Common Questions</button>
        <button onClick={loadQuiz} style={buttonStyle}>Generate Quiz</button>
      </div>

      {/* Display common questions */}
      {questions.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {questions.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      )}

      {/* Display quiz */}
      {quiz && quiz.map((q, i) => (
        <div key={i} style={{ marginTop: "20px", textAlign: "left" }}>
          <p><strong>{q.question}</strong></p>
          <ul>
            {q.options.map((opt, j) => <li key={j}>{opt}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

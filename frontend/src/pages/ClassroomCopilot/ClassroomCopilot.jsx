import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassroomCopilot.css";  // <-- make sure this exists

const ClassroomCopilot = ({ userRole, onLogout }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await fetch(
        `http://127.0.0.1:8000/answer?question=${encodeURIComponent(question)}`
      );
      const data = await res.json();
      setAnswer(data.answer || "No answer returned.");
    } catch (err) {
      setAnswer("Error fetching answer from backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="copilot-page">

      {/* Frosted Glass Card */}
      <div className="copilot-card">

        {/* Top Bar */}
        <div className="copilot-bar">
          <span className="copilot-title">Classroom Copilot</span>

          <div className="copilot-bar-buttons">
            {userRole === "student" && (
              <button className="nav-btn" onClick={() => navigate("/student")}>
                Student Dashboard
              </button>
            )}

            {userRole === "instructor" && (
              <button className="nav-btn" onClick={() => navigate("/instructor")}>
                Instructor Dashboard
              </button>
            )}

            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        {/* Content */}
        <div className="copilot-content">

          <textarea
            className="copilot-input"
            rows={4}
            placeholder="Ask a question about the course materials..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button className="ask-btn" onClick={askQuestion} disabled={loading}>
            {loading ? "Thinking..." : "Ask Question"}
          </button>

          {answer && (
            <div className="answer-box">
              <h3 className="answer-title">Answer:</h3>
              <p className="answer-text">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomCopilot;
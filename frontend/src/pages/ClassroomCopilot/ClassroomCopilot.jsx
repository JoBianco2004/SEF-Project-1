import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const res = await fetch(`http://127.0.0.1:8000/answer?question=${encodeURIComponent(question)}`);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      {/* Buttons: Dashboard + Logout */}
      <div className="w-full max-w-2xl flex justify-between mb-4">
        <div>
          {userRole === "student" && (
            <button
              onClick={() => navigate("/student")}
              className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Student Dashboard
            </button>
          )}
          {userRole === "instructor" && (
            <button
              onClick={() => navigate("/instructor")}
              className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Instructor Dashboard
            </button>
          )}
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Chat UI */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6">

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Classroom Copilot
        </h1>

        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
          rows={4}
          placeholder="Ask a question about the course materials..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <div className="border border-gray-300 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Answer:</h2>
            <p>{answer}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClassroomCopilot;

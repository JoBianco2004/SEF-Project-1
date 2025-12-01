import React, { useState } from "react";

const ClassroomCopilot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Classroom Copilot
        </h1>

        {/* Input */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
          rows={4}
          placeholder="Ask a question about the course materials..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={askQuestion}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {/* Answer Box */}
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

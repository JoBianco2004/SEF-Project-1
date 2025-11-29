import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InstructorDashboard.css";

function InstructorDashboard() {
  // Mock student list
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", flagged: false },
    { id: 2, name: "Ben Carter", flagged: false },
    { id: 3, name: "Chris Lee", flagged: false }
  ]);

  // Search filter
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle flagged status
  const toggleFlag = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, flagged: !s.flagged } : s
      )
    );
  };

  // Remove student
  const removeStudent = (id) => {
    if (window.confirm("Remove this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="instructor-container">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <Link to="/student" className="nav-link">Student Dashboard</Link>
        <Link to="/instructor" className="nav-link">Instructor Dashboard</Link>
        <Link to="/chat" className="nav-link">Chat</Link>
      </nav>

      <h2 className="dashboard-heading">Instructor Dashboard</h2>

      {/* Search */}
      <div className="search-area">
        <input
          className="search-input"
          type="text"
          placeholder="Search students"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student List */}
      <ul className="student-list">
        {filteredStudents.length === 0 ? (
          <p className="no-results">No students found.</p>
        ) : (
          filteredStudents.map((student) => (
            <li key={student.id} className="student-card">
              <span className="student-name">
                {student.name}
                {student.flagged && <span className="flag-indicator"> (flagged)</span>}
              </span>

              <div className="student-actions">
                <button
                  className="btn"
                  onClick={() => toggleFlag(student.id)}
                >
                  {student.flagged ? "Unflag" : "Flag"}
                </button>

                <button
                  className="btn remove-btn"
                  onClick={() => removeStudent(student.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default InstructorDashboard;

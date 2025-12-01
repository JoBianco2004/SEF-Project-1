import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InstructorDashboard.css"; // <-- ADD THIS

export default function InstructorDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchUsers = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    axios
      .get("http://localhost:8000/user/read?skip=0&limit=1000")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      setSuccess("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete user.");
    }
  };

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <div className="instructor-page">
      <div className="instructor-card">
        
        {/* Header Bar */}
        <div className="instructor-bar">
          <span className="instructor-title">Instructor Dashboard</span>
          <button className="back-btn" onClick={() => navigate("/chat")}>
            Back to Copilot
          </button>
        </div>

        <div className="instructor-content">
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          {users.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.role}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

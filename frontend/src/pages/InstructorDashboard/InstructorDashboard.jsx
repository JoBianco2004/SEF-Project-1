import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch users from backend
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

  // Delete user handler
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      setSuccess("User deleted successfully.");
      fetchUsers(); // Refresh user list after delete
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Instructor Dashboard</h2>

      <button
        onClick={() => navigate("/chat")}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Back to Chat
      </button>

      {success && <p style={{ color: "green" }}>{success}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

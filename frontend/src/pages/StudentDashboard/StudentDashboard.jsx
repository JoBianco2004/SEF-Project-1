import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css"; // <-- ADD THIS

export default function StudentDashboard({ userId, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    axios
      .get(`http://localhost:8000/user/${userId}`)
      .then((res) => {
        setUserData(res.data);
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          password: "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userData) {
      setError("User data is not loaded yet.");
      return;
    }

    const updatePayload = {
      ...form,
      role: userData.role,
    };

    if (!updatePayload.password) delete updatePayload.password;

    try {
      await axios.put(`http://localhost:8000/user/${userId}`, updatePayload);
      setSuccess("Account updated successfully!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(", "));
      } else {
        setError("Update failed");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      onLogout();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete account");
    }
  };

  if (loading) return <p className="loading">Loading your dashboard...</p>;

  return (
    <div className="student-page">
      <div className="student-card">

        {/* Header Bar */}
        <div className="student-bar">
          <span className="student-title">Student Dashboard</span>
          <div className="student-actions">
            <button className="nav-btn" onClick={() => navigate("/chat")}>Back to Copilot</button>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        {/* Content */}
        <div className="student-content">
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <form className="student-form" onSubmit={handleUpdate}>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password (leave blank to keep current)</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button className="save-btn" type="submit">Save Changes</button>
          </form>

          <hr className="divider" />

          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>

        </div>
      </div>
    </div>
  );
}

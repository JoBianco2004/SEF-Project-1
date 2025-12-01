import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    setError("");
    // Corrected URL here — removed extra /user/
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
      // Corrected URL here — removed extra /user/
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
      // Corrected URL here — removed extra /user/
      await axios.delete(`http://localhost:8000/user/${userId}`);
      onLogout();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete account");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error && !userData) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {/* Button: Go to Chat */}
      <div style={{ marginBottom: 15 }}>
        <button onClick={() => navigate("/chat")} style={{ marginRight: 10 }}>
          Go to Chat
        </button>
      </div>

      <h2>Student Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password: (leave blank to keep current password)
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Update Account</button>
      </form>

      <hr />

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
}

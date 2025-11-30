import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  // This is the initial profile data stored in state
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    major: "Computer Science",
  });

  // Tracks whether we are in edit mode or just viewing
  const [isEditing, setIsEditing] = useState(false);

  // Updates the profile data when user types in inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Toggles between edit mode and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Simulates deleting the profile by clearing it
  const deleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setProfile(null);
    }
  };

  // If profile is deleted, show this message
  if (!profile) {
    return <div className="dashboard-container">Your profile has been deleted.</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Navigation links to switch pages */}
      <nav className="dashboard-nav">
        <Link to="/student" className="nav-link">Student Dashboard</Link>
        <Link to="/instructor" className="nav-link">Instructor Dashboard</Link>
        <Link to="/chat" className="nav-link">Chat</Link>
      </nav>

      <h2 className="dashboard-heading">Student Dashboard</h2>

      {isEditing ? (
        <div className="edit-form">
          <label className="field">
            <span className="label-text">Name:</span>
            <input
              className="field-input"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span className="label-text">Email:</span>
            <input
              className="field-input"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span className="label-text">Major:</span>
            <input
              className="field-input"
              type="text"
              name="major"
              value={profile.major}
              onChange={handleChange}
            />
          </label>

          <div className="actions">
            <button className="btn" onClick={toggleEdit}>Save</button>
          </div>
        </div>
      ) : (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Major:</strong> {profile.major}</p>
          <div className="actions">
            <button className="btn" onClick={toggleEdit}>Edit Profile</button>
          </div>
        </div>
      )}

      <hr className="divider" />

      <div className="danger-zone">
        <button className="btn delete-btn" onClick={deleteProfile}>
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;

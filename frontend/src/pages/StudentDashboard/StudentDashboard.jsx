import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  // Profile data stored in state
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    major: "Computer Science",
  });

  // Tracks edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Updates fields when typing
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Delete profile simulation
  const deleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setProfile(null);
    }
  };

  // If deleted
  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <p>Your profile has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Main white rounded card */}
      <div className="dashboard-card">

        {/* Navigation */}
        <nav className="dashboard-nav">
          <Link to="/student" className="nav-link">Student Dashboard</Link>
          <Link to="/instructor" className="nav-link">Instructor Dashboard</Link>
          <Link to="/chat" className="nav-link">Chat</Link>
        </nav>

        {/* Heading */}
        <h2 className="dashboard-heading">Student Dashboard</h2>

        {/* Edit mode section */}
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
              <button className="sDash-btn" onClick={toggleEdit}>Save</button>
            </div>
          </div>
        ) : (
          /* Normal profile view */
          <div className="profile-view">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Major:</strong> {profile.major}</p>

            <div className="actions">
              <button className="sDash-btn" onClick={toggleEdit}>Edit Profile</button>
            </div>
          </div>
        )}

        {/* Divider */}
        <hr className="divider" />

        {/* Delete button */}
        <div className="danger-zone">
          <button className="btn delete-btn" onClick={deleteProfile}>
            Delete Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
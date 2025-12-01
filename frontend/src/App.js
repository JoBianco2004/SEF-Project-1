import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginSignup from './pages/LoginSignup/LoginSignup';
import ClassroomCopilot from './pages/ClassroomCopilot/ClassroomCopilot';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // expects { user_id, role }

  // Restore user data from localStorage on app load
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        // Validate essential keys before setting
        if (parsedUserData.user_id && parsedUserData.role) {
          setUserData(parsedUserData);
          setIsLoggedIn(true);
        } else {
          // Data invalid, clear localStorage
          localStorage.removeItem("userData");
        }
      } catch (error) {
        console.error("Failed to parse userData from localStorage", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // When login succeeds, store user data and persist to localStorage
  function handleLoginSuccess(user) {
    setUserData(user);
    setIsLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  // On logout, clear state and localStorage
  function handleLogout() {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
  }

  if (!isLoggedIn) {
    return <LoginSignup onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/chat" />} />

      {/* Chat route */}
      <Route
        path="/chat"
        element={<ClassroomCopilot userRole={userData.role} onLogout={handleLogout} />}
      />

      {/* Student dashboard only accessible by student */}
      <Route
        path="/student"
        element={
          userData.role === "student" ? (
            <StudentDashboard userId={userData.user_id} onLogout={handleLogout} />
          ) : (
            <Navigate to="/chat" />
          )
        }
      />

      {/* Instructor dashboard only accessible by instructor */}
      <Route
        path="/instructor"
        element={
          userData.role === "instructor" ? (
            <InstructorDashboard userId={userData.user_id} onLogout={handleLogout} />
          ) : (
            <Navigate to="/chat" />
          )
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/chat" />} />
    </Routes>
  );
}

export default App;

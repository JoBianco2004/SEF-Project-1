import './App.css';
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginSignup from './pages/LoginSignup/LoginSignup';
import ClassroomCopilot from './pages/ClassroomCopilot/ClassroomCopilot';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  // Updated to accept userData object with a role property
  function handleLoginSuccess(userData) {
    setIsLoggedIn(true);
    setUserType(userData.role); // e.g. "student" or "instructor"
  }

  if (!isLoggedIn) {
    return <LoginSignup onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Routes>
      <Route path="/"
        element={
          userType === "student" ? <Navigate to="/student" /> :
          userType === "instructor" ? <Navigate to="/instructor" /> :
          <Navigate to="/chat" />
        }
      />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/chat" element={<ClassroomCopilot />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

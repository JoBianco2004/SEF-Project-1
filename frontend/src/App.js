import React, { useState } from "react";
import LoginSignup from './pages/LoginSignup/LoginSignup';
import ClassroomCopilot from './pages/ClassroomCopilot/ClassroomCopilot';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? (
        <ClassroomCopilot />
      ) : (
        <LoginSignup onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;

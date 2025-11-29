import React, { useState } from "react";
import "./LoginSignup.css";

function LoginSignup({ onLoginSuccess }) {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    if (email && password) {
      if (action === "Login") {
        onLoginSuccess && onLoginSuccess();
      } else {
        alert("Account created (frontend only for now)");
      }
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="header">
          <div className="text">{action}</div>
        </div>

        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="submit-container">
          <div
            className={`submit ${action === "Sign Up" ? "active" : ""}`}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>

          <div
            className={`submit ${action === "Login" ? "active" : ""}`}
            onClick={() => setAction("Login")}
          >
            Login
          </div>
        </div>

        <button className="main-submit-btn" onClick={handleSubmit}>
          {action === "Login" ? "Log In" : "Sign Up"}
        </button>

        {action === "Login" && (
          <div className="forgot-password">
            Forgot Password?
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;

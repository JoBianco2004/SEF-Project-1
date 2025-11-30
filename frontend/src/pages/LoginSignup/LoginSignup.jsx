import React, { useState } from "react";
import "./LoginSignup.css";

function LoginSignup({ onLoginSuccess }) {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="auth-page">
      {/* Frosted glass card */}
      <div className="auth-card">

        {/* Header bar */}
        <div className="auth-card__bar">
          <span className="auth-card__bar-title">
            {action === "Login" ? "LOGIN" : "SIGN UP"}
          </span>
        </div>

        {/* Content split */}
        <div className="auth-card__content">

          {/* Left Side – Form */}
          <div className="auth-left">
            <h2 className="auth-title">
              {action === "Login" ? "Sign in to continue" : "Create an account"}
            </h2>

            <div className="inputs">
              {action === "Sign Up" && (
                <div className="input">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAction("Login");
                  handleSubmit();
                }}
              >
                Login
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Right side – Logo */}
          <div className="auth-right">
            <img
              className="brand-logo"
              alt="Logo"
              src="https://images.seeklogo.com/logo-png/42/2/fgcu-florida-gulf-coast-university-logo-png_seeklogo-425958.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;


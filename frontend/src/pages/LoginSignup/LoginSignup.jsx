import React from "react";
import "./LoginSignup.css";

const LoginSignup = ({ onLoginSuccess }) => {
  const [action, setAction] = React.useState("Login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    if (email && password) {
      onLoginSuccess && onLoginSuccess();
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <div className="auth-page">
      {/* Frosted glass card */}
      <div className="auth-card">

        {/* Top bar like the SCF header */}
        <div className="auth-card__bar">
          <span className="auth-card__bar-title">LOGIN</span>
        </div>

        {/* Content split: left = form, right = logo */}
        <div className="auth-card__content">
          {/* Left side – form */}
          <div className="auth-left">
            <h2 className="auth-title">Sign in to continue</h2>

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
                  handleLogin();
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

          {/* Right side – logo / brand */}
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
};

export default LoginSignup;
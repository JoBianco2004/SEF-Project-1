import React, { useState, } from "react";
import axios from "axios";
import "./LoginSignup.css";

const DEV_MODE = true;


export default function LoginSignup({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "student",
    dob: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form field changes
  const handleChange = (e, isLoginForm = true) => {
    const { name, value } = e.target;
    if (isLoginForm) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle login submit


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/user/user/login",
        loginData
      );
      onLoginSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };




  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/user/user/create", signupData);
      setSuccess("Account created! Please log in.");
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header bar */}
        <div className="auth-card__bar">
          <span className="auth-card__bar-title">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </span>
        </div>

        {/* Split content */}
        <div className="auth-card__content">

          {/* LEFT SIDE — FORM */}
          <div className="auth-left">
            <h2 className="auth-title">
              {isLogin ? "Sign in to continue" : "Create an account"}
            </h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            {isLogin ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="inputs">
                  <div className="input">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      placeholder="name@example.com"
                      onChange={(e) => handleChange(e, true)}
                      required
                    />
                  </div>

                  <div className="input">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      placeholder="••••••••"
                      onChange={(e) => handleChange(e, true)}
                      required
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="lbtn lbtn-primary" type="submit">
                    Login
                  </button>
                  <button
                    className="lbtn lbtn-outline"
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <div className="inputs">
                  <div className="input">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={signupData.first_name}
                      placeholder="First Name"
                      onChange={(e) => handleChange(e, false)}
                      required
                    />
                  </div>

                  <div className="input">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={signupData.last_name}
                      placeholder="Last Name"
                      onChange={(e) => handleChange(e, false)}
                      required
                    />
                  </div>

                  <div className="input">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      placeholder="name@example.com"
                      onChange={(e) => handleChange(e, false)}
                      required
                    />
                  </div>

                  <div className="input">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={signupData.password}
                      placeholder="••••••••"
                      onChange={(e) => handleChange(e, false)}
                      required
                    />
                  </div>

                  <div className="input">
                    <label>Role</label>
                    <select
                      name="role"
                      value={signupData.role}
                      onChange={(e) => handleChange(e, false)}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                  </div>

                  <div className="input">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={signupData.dob}
                      onChange={(e) => handleChange(e, false)}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="lbtn lbtn-primary" type="submit">
                    Sign Up
                  </button>
                  <button
                    className="lbtn lbtn-outline"
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT SIDE — FGCU LOGO */}
          <div className="auth-right">
            <img
              className="brand-logo"
              alt="FGCU Logo"
              src="https://images.seeklogo.com/logo-png/42/2/fgcu-florida-gulf-coast-university-logo-png_seeklogo-425958.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

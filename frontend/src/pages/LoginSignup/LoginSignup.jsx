import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post("http://localhost:8000/user/login", loginData);
      // Pass entire response data (includes user_id and role)
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
      await axios.post("http://localhost:8000/user/create", signupData);
      setSuccess("Account created! Please log in.");
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}>
          Login
        </button>
        <button onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}>
          Sign Up
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handleChange(e, true)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleChange(e, true)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={signupData.first_name}
            onChange={(e) => handleChange(e, false)}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={signupData.last_name}
            onChange={(e) => handleChange(e, false)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) => handleChange(e, false)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => handleChange(e, false)}
            required
          />
          <select
            name="role"
            value={signupData.role}
            onChange={(e) => handleChange(e, false)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <input
            type="date"
            name="dob"
            value={signupData.dob}
            onChange={(e) => handleChange(e, false)}
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

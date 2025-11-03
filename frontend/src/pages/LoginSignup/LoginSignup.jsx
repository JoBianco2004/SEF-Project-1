import React from 'react'
import './LoginSignup.css'

const LoginSignup = ({ onLoginSuccess }) => {
  const [action, setAction] = React.useState("Sign Up");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  function handleLogin() {
    if (email && password) {
      onLoginSuccess();
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
      </div>

      <div className="inputs">

        {action === "Sign Up" && (
          <div className="input">
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

      </div>

      <div className="submit-container">
        <div 
          className="submit" 
          onClick={() => setAction("Sign Up")}
          style={{ cursor: 'pointer' }}
        >
          Sign Up
        </div>
        <div 
          className="submit" 
          onClick={() => {
            setAction("Login");
            handleLogin(); 
          }}
          style={{ cursor: 'pointer' }}
        >
          Login
        </div>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Forgot Password?
        </div>
      )}
    </div>
  )
}

export default LoginSignup

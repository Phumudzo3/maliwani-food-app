import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Import authentication context
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdLock } from "react-icons/md"; // Import email and lock icons
import "../components/styles/login.css"; // Import CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAuth(); // Get user setter function
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const API_URL = "https://backend-food-app-pz8p.onrender.com/api/user/login";
      const response = await axios.post(API_URL, { email, password }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store full user data

        setUser(response.data.user); // Update context with full user info
        navigate("/"); // Redirect to home page
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        {/* Input Group for Email */}
        <div className="input-group">
          <label htmlFor="email">
            <MdEmail />
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Input Group for Password */}
        <div className="input-group">
          <label htmlFor="password">
            <MdLock />
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="signup-message">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;

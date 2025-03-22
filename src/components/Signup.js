import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import "../components/styles/signup.css"; // Import CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "user", // Default user type
    status: "active", // Default status
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required!");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("https://backend-food-app-pz8p.onrender.com/api/user/signup", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("Signup successful:", response.data);
      setSuccess("Signup successful! Redirecting to login...");
      setError("");

      setTimeout(() => {
        navigate("/login"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred. Try again.");
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaPhone className="icon" />
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Signup;

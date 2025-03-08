import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FiLogOut, FiUser } from "react-icons/fi";
import "../components/styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <h1>🍽️Maliwani</h1>

      {/* Navigation Links */}
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
            Orders
          </NavLink>
        </li>
      </ul>

      {/* User Profile Dropdown */}
      {user ? (
        <div className="user-info">
          <div className="profile-container" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <img src={user.photo || "/default-avatar.png"} alt="User Avatar" className="profile-photo" />
            <span className="user-email">{user.name}</span>
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="profile-dropdown">
              <p><FiUser /> <strong>{user.name}</strong></p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone || "N/A"}</p>
              <p>Type: {user.type}</p>
              <button className="logout-btn" onClick={logout}>
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" className="login-btn">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo" onClick={() => navigate("/")}>
          Trade
        </span>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <button
              className="navbar-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="navbar-button navbar-button-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <button
            className="navbar-button navbar-button-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../services/request";
import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<{
    fullName: string;
    funds: number;
  } | null>(null);
  const [funds, setFunds] = useState<string>(""); // start empty

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserProfile = async () => {
        const data = await request<{
          data: { fullName: string; funds: number };
        }>({
          method: "GET",
          url: "user/profile",
        });

        if (data && data.data) {
          setUserProfile(data.data);
          setFunds(""); // keep input empty
        }
      };

      fetchUserProfile();
    } else {
      setUserProfile(null);
      setFunds("");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!funds.trim()) return; // prevent empty submission

    try {
      const payload = { funds: Number(funds) };
      const data = await request<{ data: { fullName: string; funds: number } }>(
        {
          method: "PUT",
          url: "/user/update-funds",
          data: payload,
        }
      );

      if (data && data.data) {
        setUserProfile(data.data);
        setFunds(""); // clear input after update
      }
    } catch (err) {
      console.error("Error updating funds:", err);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="navbar-logo">
          Trade<span className="navbar-logo-accent">Hub</span>
        </span>
      </div>

      {/* Center user profile */}
      {isLoggedIn && userProfile && (
        <div className="navbar-user-info">
          <div className="user-details">
            <span className="user-name">{userProfile.fullName}</span>
            <span className="user-funds">
              ${userProfile.funds.toFixed(2)}
            </span>
          </div>

          <form className="funds-form" onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Update Funds"
              value={funds}
              onChange={(e) => setFunds(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      {/* Right auth buttons */}
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <button className="btn btn-danger" onClick={onLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

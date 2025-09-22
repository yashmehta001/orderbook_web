import React from "react";
import "../App.css";

interface WelcomeScreenProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    funds: number;
  };
  onLogout: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="auth-card text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome, {user.firstName} 👋
      </h2>
      <p className="text-gray-700 mb-6">
        Available Funds: <span className="font-semibold">${user.funds}</span>
      </p>
      <button onClick={onLogout} className="auth-button bg-red-500 hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default WelcomeScreen;

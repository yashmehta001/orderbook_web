import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import WelcomeScreen from "./WelcomeScreen";
import "../App.css";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [user, setUser] = useState<any | null>(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setMode("login");
  };

  if (user) {
    return <WelcomeScreen user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      {mode === "signup" ? (
              <SignupForm
                  switchToLogin={() => setMode("login")}
                  onSignupSuccess={handleLoginSuccess}
              />
      ) : (
        <LoginForm
          switchToSignup={() => setMode("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default AuthPage;

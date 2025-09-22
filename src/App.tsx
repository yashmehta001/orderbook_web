import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={!!user} />} />
        <Route
          path="/signup"
          element={<SignupForm switchToLogin={() => window.location.href = "/login"} onSignupSuccess={setUser} />}
        />
        <Route
          path="/login"
          element={<LoginForm switchToSignup={() => window.location.href = "/signup"} onLoginSuccess={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

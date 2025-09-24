import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import './App.css'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  const reloadAll = () => {
    setReloadKey(prev => prev + 1);
  };
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
        <Route path="/" element={<Home key={reloadKey} isLoggedIn={!!user} reload={reloadAll}/>} />
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

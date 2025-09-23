import React, { useState } from "react";
import { signupUser, loginUser } from "../services/auth";

type AuthMode = "signup" | "login";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    funds: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response =
      mode === "signup"
        ? await signupUser(formData)
        : await loginUser({
            email: formData.email,
            password: formData.password,
          });

    if (response && !response.Error) {
      console.log("User Data:", response.data);
      // You could store token here in localStorage/sessionStorage
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          {mode === "signup"
            ? "Sign up to start your journey"
            : "Login to continue"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="auth-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />

          {mode === "signup" && (
            <input
              type="number"
              name="funds"
              placeholder="Funds (optional)"
              value={formData.funds}
              onChange={handleChange}
              className="auth-input"
            />
          )}

          <button type="submit" className="auth-button">
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            className="auth-switch"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          >
            {mode === "signup" ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

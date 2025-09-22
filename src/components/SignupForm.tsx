import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/auth";
import "../App.css";

interface SignupFormProps {
  switchToLogin: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSignupSuccess: (user: any) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ switchToLogin, onSignupSuccess }) => {
  const navigate = useNavigate();
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
    const response = await signupUser(formData);

    if (response && !response.Error) {
      // Store token and user info
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onSignupSuccess(response.data.user);

      // Redirect to home page
      navigate("/");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
        Create Account
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Sign up to start your journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <input
          type="number"
          name="funds"
          placeholder="Funds (optional)"
          value={formData.funds}
          onChange={handleChange}
          className="auth-input"
        />

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <button className="auth-switch" onClick={switchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupForm;

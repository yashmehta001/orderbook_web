import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

interface LoginFormProps {
  switchToSignup: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoginSuccess: (user: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  switchToSignup,
  onLoginSuccess,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response && !response.Error) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
      navigate("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div className="auth-card">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Login to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <button className="auth-switch" onClick={switchToSignup}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

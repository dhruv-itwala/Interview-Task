import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login_Signup.css"; // Assuming you have some basic styles

const Login_Signup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login or Signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = isLogin
      ? "http://localhost:5000/api/hr/login"
      : "http://localhost:5000/api/hr/register";

    try {
      const response = await axios.post(apiUrl, formData);
      if (response.status === 200) {
        if (isLogin) {
          const { token } = response.data;

          // Save the token in localStorage and navigate to the dashboard
          localStorage.setItem("authToken", token);
          setSuccess("Logged in successfully!");
          setError("");
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          setSuccess("Account created successfully! You can now login.");
          setError("");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="toggle-auth">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login_Signup;

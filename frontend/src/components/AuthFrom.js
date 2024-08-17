import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "./Popup";
import "../CSS/Register.css"

const Register = () => {
  const url = "https://geektask-backend.onrender.com";
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    profession: "",
  });
  const navigate = useNavigate();

  const { email, username, password, phoneNumber, profession } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/api/auth/register`, formData);
      console.log(data.data);
      if (data.success) {
        SuccessToast(data.msg);
        navigate("/");
      } else {
        ErrorToast(data?.msg);
      }
    } catch (err) {
      console.log("err", err);
      ErrorToast(err.response.data.msg);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-content">
          <h2 className="form-title">Register</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              name="profession"
              value={profession}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
          <div className="sign-in">
            Already SignUp?{" "}
            <span
              onClick={() => navigate("/")}
              className="sign-in-link"
            >
              SignIn
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

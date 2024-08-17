import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoggin } from '../redux/slices/AuthSlice/AuthSlice';
import { useDispatch } from 'react-redux';
import { ErrorToast, SuccessToast } from './Popup';
import "../CSS/LoginForm.css";

const LoginForm = () => {
  const url = "https://geektask-backend.onrender.com";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/api/auth/login`, formData);
      if (data.success) {
        SuccessToast(data.msg);
        dispatch(setLoggin(data.data));
        localStorage.setItem("geeksAuthToken", data.token);
        localStorage.setItem("geeksAuthemail", data.data.email);

        navigate('/home');
      } else {
        console.log("error", data);
        ErrorToast(data?.msg);
      }
    } catch(err) {
      console.log("err", err);
      ErrorToast(err.response.data.msg);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-content">
          <h1 className="form-title">Login</h1>
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
              Sign In
            </button>
          </div>
          <div className="sign-up">
            You have not Signed Up Yet?{" "}
            <span onClick={() => navigate("/register")} className="sign-up-link">
              SignUp
            </span>
          </div>
        </form>
        <div className='body-color'>
         
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

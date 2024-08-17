import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorToast, SuccessToast } from "./Popup";
import "../CSS/Updateprofile.css"
const Updateprofile = () => {
  const url = "https://geektask-backend.onrender.com";
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    profession: ""
  });
  const token = localStorage.getItem("geeksAuthToken");
  const { id } = useParams();
  const navigate = useNavigate();
  const { username, phoneNumber, profession } = formData;

  useEffect(() => {
    if (!token) {
      ErrorToast("You Are not Authorised User. Please login first");
      navigate("/");
    }
  
    if (id) {
      getProfileData();
    }
  }, [id, token, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${url}/api/profile`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (data?.success) {
        setFormData(data.data);
      } else {
        ErrorToast(data?.response?.data?.msg);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`${url}/api/auth/user-update/${id}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("objectdata",data)
      if (data?.success) {
        SuccessToast(data?.msg);
        navigate("/home");
      } else {
        
        ErrorToast(data?.msg);
      }
    } catch (err) {
      console.log("objectoferr",err)
      ErrorToast(err?.response?.data?.msg);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-content">
          <h2 className="form-title">Update Your Profile {username}</h2>
        
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
         
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;



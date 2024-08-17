import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "./Popup";


import "../CSS/HomePage.css"
const Home = () => {
  const url = "https://geektask-backend.onrender.com";
  const [data, setData] = useState([]);
  const token = localStorage.getItem("geeksAuthToken");
  const authemail = localStorage.getItem("geeksAuthemail");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      ErrorToast("You Are not authorised. Please login first");
      navigate("/");
    }
    getAllData();
  }, [authemail, token, navigate]);

  const getAllData = async () => {
    try {
      const { data } = await axios.get(`${url}/api/user`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        setData(data.data);
      } else {
        ErrorToast(data?.response?.data?.msg);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.msg);
    }
  };

  const editPage = (id) => {
    navigate(`/update-profile/${id}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">All Users Details</h1>

      <div className="user-grid">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="user-card">
              <h2 className="user-name">{item?.username}</h2>
              <p className="user-info">{item?.phoneNumber}</p>
              <p className="user-info">{item?.email}</p>
              <p className="user-info">{item?.profession}</p>

              {authemail === item.email && (
                <div className="user-actions">
                  <button onClick={() => editPage(item._id)} className="edit-button">
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-users">
            <p>No Users available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

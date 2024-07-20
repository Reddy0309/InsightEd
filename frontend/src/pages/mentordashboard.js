import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./mentorSignup.css"; // Reusing the Signup CSS for styling
import Header from "./Header";
import Footer from "./Footer";

const MentorDashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/mentors/login", {
        username,
        password,
      });
      localStorage.setItem("mentor", JSON.stringify(response.data.mentor));
      setMessage(response.data.message);
      navigate("/mentorpage");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />
      <div className="Signup-page">
        <div className="Signup-container">
          {/* <h2>Mentor Dashboard</h2> */}
          <h1>Welcome, Mentor!</h1>
          <h2>Please Login!</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="Signup-input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="Signup-input"
              required
            />
            <br></br>
            <br></br>
            <button type="submit" className="Signup-button">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorDashboard;

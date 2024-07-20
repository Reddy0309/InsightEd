// frontend/src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Signup.css";

const Register = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/register", {
        usn,
        password,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        window.location.href = "/parentdashboard";
      }, 5000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />
      <div className="signup-Page">
        <div className="signup-Container">
          <h2 className="h3">Register</h2>
          <br />
          <br />
          <form onSubmit={registerUser}>
            <label className="label" htmlFor="usn">
              Enter USN
            </label>
            <input
              type="text"
              id="usn"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              placeholder="Student USN"
              className="signup-Input"
              required
            />
            <label className="label" htmlFor="password">
              Enter password provided by college
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password provided by college"
              className="signup-Input"
              required
            />
            <button type="submit" className="signup-Button">
              Register
            </button>
          </form>
          {message && <p>{message}</p>}
          {message && message.includes("successfully") && (
            <div>
              <p>Redirecting to Home Page</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

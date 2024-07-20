// frontend/src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Signup.css"; // Reusing the Signup CSS for styling
import Header from "./Header";
import Footer from "./Footer";
import LanguageSelectionModal from "../components/languageSelection";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", { usn, password });
      setMessage(response.data.message);

      if (response.data.user) {
        localStorage.setItem("parent", JSON.stringify(response.data.user));
        navigate("/parent", { state: { user: response.data.user } });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="h2">Login</h2>
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <label className="label" htmlFor="usn">
              Enter USN
            </label>
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              placeholder={t("studentusn")}
              className="signup-input"
            />
            <label className="label" htmlFor="password">
              Enter password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
              className="signup-input"
            />
            <br></br>
            <br></br>
            <button type="submit" className="signup-button">
              {t("login")}
            </button>
          </form>
          <br />
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

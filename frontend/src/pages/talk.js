import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./FooterHome";
import "./dashboard.css"; // Assuming this contains styles for both ParentDashboard and talk.js

const Talk = () => {
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  const [speechTranslation, setSpeechTranslation] = useState("");
  const [languageChoice, setLanguageChoice] = useState("1");
  const [isListening, setIsListening] = useState(false);

  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("parent"));
    if (!user) {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);

  const handleLanguageChange = (e) => {
    setLanguageChoice(e.target.value);
  };

  const handleSpeechToText = async () => {
    setLoadingSpeech(true);
    try {
      const payload = {
        language_choice: languageChoice,
      };

      const response = await fetch("http://localhost:5001/Speechtotext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSpeechTranslation(data.translation);
      setMessage(data.translation);
      setLoadingSpeech(false);
      setIsListening(false); // Stop listening after translation
    } catch (error) {
      console.error("Error fetching speech to text:", error);
      setLoadingSpeech(false);
      setIsListening(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const response = await axios.post("/api/msg/send", {
          sender: user.USN,
          receiver: user["NAME OF THE MENTOR"],
          message: message,
        });
        setInfo(response.data.message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessage("");
      } catch (error) {
        setInfo(error.response?.data?.message || "Message Not Sent");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/parent", { state: { user: user } });
  };

  const handleMicClick = () => {
    setIsListening(true);
    handleSpeechToText();
  };

  const handleStopListeningClick = () => {
    setIsListening(false);
    handleSpeechToText();
  };

  return (
    <div className="parent-dashboard-page">
      <Header showBackButton={true} hideButtons={true} />
      <div className="dashboard-container">
        <h2 className="dashboard-welcome">Chat with Mentor</h2>
        {/* <div>
          {messages.map((msg, index) => (
            <p key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>{msg}</p>
          ))}
        </div> */}
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="texttalk"
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#5D22DC",
              color: "#fff",
            }}
          >
            Send
          </button>
        </form>

        {info && <p>{info}</p>}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div>
            <label htmlFor="language" className="Select">
              Select Language:
            </label>
            <select
              id="language"
              value={languageChoice}
              onChange={handleLanguageChange}
            >
              <option value="1">Hindi</option>
              <option value="2">Telugu</option>
              <option value="3">Kannada</option>
              <option value="4">English</option>
            </select>
          </div>
          <br />
          {isListening ? (
            <button
              onClick={handleStopListeningClick}
              className="IcoN"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DC143C",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon icon={faStop} style={{ fontSize: "24px" }} />
            </button>
          ) : (
            <button
              onClick={handleMicClick}
              className="IcoN"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#5D22DC",
                color: "#fff",
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{ fontSize: "24px" }}
              />
            </button>
          )}
        </div>
        <br />
        <button onClick={handleGoBack} className="goBack">
          Go Back
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Talk;

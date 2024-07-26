import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./FooterHome";
import "./dashboard.css";
import { useTranslation } from "react-i18next";

const MessageComponent = () => {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("parent"));
    const mentor = JSON.parse(localStorage.getItem("parent"));

    if (!student || !mentor) {
      setInfo("Student or Mentor information is missing.");
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/msg/parentsee", {
          name: student["NAME OF THE MENTOR"],
          usn: student.USN,
        });

        if (isMounted) {
          setMessages(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setInfo(error.response?.data?.message || "Message Not Sent");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  const handleGoBack = () => {
    const user = JSON.parse(localStorage.getItem("parent"));
    navigate("/parent", { state: { user: user } });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("parent"));
    if (!user) {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);
  const downloadPDF = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };
  return (
    <div className="parent-dashboard-page">
      <Header showBackButton={true} hideButtons={true} />
      <div className="dashboard-container">
        <h2 className="dashboard-welcome mEntor">{t("messagesfrommentor")}</h2>
        <div className="button-row">
          <button className="action-button BACK" onClick={handleGoBack}>
            {t("goback")}
          </button>
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            textAlign: "left",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {info && <p>{info}</p>}
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {index + 1}.{" "}
              {typeof msg.message === "string" &&
              msg.message.startsWith("blob") ? (
                <a href={msg.message} download={`report_${index + 1}.pdf`}>
                  Download PDF
                </a>
              ) : (
                msg.message
              )}
              <br />
              <small>{formatTimestamp(msg.timestamp)}</small>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MessageComponent;

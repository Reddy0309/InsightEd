import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./FooterHome";
import { useTranslation } from "react-i18next";
import "./dashboard.css"; 

const ParentPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useMemo(
    () => location.state?.user || {},
    [location.state?.user]
  );
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post("/api/users/change-password", {
        usn: user.USN,
        password,
        newPassword,
      });
      setMessage(response.data.message);
      setPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Password change failed");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("parent");
    navigate("/");
  };

  const renderMessage = (message) => {
    return message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/api/msg/notifications/${user.USN}`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("parent"));
    if (!user) {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="parent-dashboard-page">
      <Header showBackButton={true} hideButtons={true} />
      <div
        className="dashboard-container parentdash Div6"
        style={{ overflowY: "auto" }}
      >
        <h1 className="h7">{t("ParentDashboard")}</h1>
        <div style={{ display: "flex", height: "100%" }} className="DIV1">
          {/* Left half */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              borderRight: "2px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "3px 0px 5px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
            }}
            className="DIV6"
          >
            <h3>{t ("UserDetails")}</h3>
            <p>
              <strong>{t("usn")}:</strong> {user.USN}
            </p>
            <p>
              <strong>{t("Name")}:</strong> {user["NAME OF THE STUDENT"]}
            </p>
            <p>
              <strong>{t("studentcontactnumber")}:</strong>{" "}
              {user["STUDENT CONTACT NUMBER"]}
            </p>
            <p>
              <strong>{t("fathername")}:</strong> {user["FATHER NAME"]}
            </p>
            <p>
              <strong>{t("fathercontactnumber")}:</strong>{" "}
              {user["FATHER CONTACT NUMBER"]}
            </p>
            <p>
              <strong>{t("mothername")}:</strong> {user["MOTHER NAME"]}
            </p>
            <p>
              <strong>{t("mothercontactnumber")}:</strong>{" "}
              {user["MOTHER CONTACT NUMBER"]}
            </p>
            <p className="Mentor">
              <strong>{t("mentorname")}:</strong> {user["NAME OF THE MENTOR"]}
            </p>
          </div>

          {/* Right half */}
          <div style={{ flex: 1, padding: "20px" }} className="DIV2">
            <div style={{ marginBottom: "20px" }} className="DIV3 DIV4">
              <button
                onClick={() => navigate("/talk", { state: { user: user } })}
                style={{ marginRight: "10px" }}
                className="buTTon TalkMentor"
              >
                {t("talkToMentor")}
              </button>
              <Link to="/view-messages">
                <button className="buTTon ViewMentor">
                {t("viewmessagefrommentor")}
                </button>
              </Link>
            </div>
            <h3 className="h8">{t("changepassword")}</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Old Password"
              className="oldpassword"
            />
            <br />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="newpassword"
            />
            <br />
            <button
              onClick={handleChangePassword}
              className="buTTon Changepassword"
            >
              {t("changepassword")}
            </button>
            <br />
            <button onClick={handleLogOut} className="buTTon Logout">
              {t("logout")}
            </button>

            {message && <p>{message}</p>}

            <div style={{ marginTop: "20px" }} className="DIV5">
              <h3 style={{ marginLeft: "30px" }}>{t("notifications")}</h3>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                {notifications.length === 0 ? (
                  <p>{t("nonotificationssent")}</p>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <p>
                        <small>
                          {new Date(notification.timestamp).toLocaleString()}
                        </small>
                      </p>
                      <p>{renderMessage(notification.message)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParentPage;

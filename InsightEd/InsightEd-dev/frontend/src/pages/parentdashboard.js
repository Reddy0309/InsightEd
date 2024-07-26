import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./FooterHome";
import "./dashboard.css";

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <div className="parent-dashboard-page">
      <Header showBackButton={true} hideButtons={true} />
      <div className="dashboard-container">
        <h2 className="dashboard-welcome">{t("parentDashboard")}</h2>
        <div className="button-row">
          <Link to="/register">
            <button className="action-button">{t("register")}</button>
          </Link>
          {/* <Link to="/capture">
            <button className="action-button">Capture</button>
          </Link> */}
          <Link to="/login">
            <button className="action-button">{t("login")}</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;

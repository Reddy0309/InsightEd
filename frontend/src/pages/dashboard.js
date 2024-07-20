import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelectionModal from "../components/languageSelection";
import "./dashboard.css";
import Header from "./Header";
import Footer from "./FooterHome";
import parentImage from "../assets/Enter as parent.png";
import mentorImage from "../assets/Enter as mentor.webp";

const Dashboard = () => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { t } = useTranslation();

  const handleOpenLanguageModal = () => {
    setShowLanguageModal(true);
  };

  const handleCloseLanguageModal = () => {
    setShowLanguageModal(false);
  };

  return (
    <div className="dashboard-page">
      <Header showBackButton={true} hideButtons={true} />
      <div className="dashboard-container">
        <h2 className="dashboard-welcome">{t("welcome")}</h2>
        <div className="dashboard-buttons">
          <Link
            to="/parentdashboard"
            className="dashboard-button-image-container"
          >
            <img
              src={parentImage}
              alt={t("enterParent")}
              className="dashboard-button-image"
            />
            <span className="tooltip">{t("enterParent")}</span>
          </Link>
          <Link to="/mentor" className="dashboard-button-image-container">
            <img
              src={mentorImage}
              alt={t("enterMentor")}
              className="dashboard-button-image"
            />
            <span className="tooltip">{t("enterMentor")}</span>
          </Link>
        </div>
        <button className="language-button" onClick={handleOpenLanguageModal}>
          {t("selectLanguage")}
        </button>
        {showLanguageModal && (
          <LanguageSelectionModal onClose={handleCloseLanguageModal} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

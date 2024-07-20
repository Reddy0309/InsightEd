// languageSelection.js

import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelectionModal = ({ onClose, onSelectLanguage }) => {
  const { t, i18n } = useTranslation();
  const handleLanguageSelect = (language) => {
    i18n.changeLanguage(language);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{t("selectLanguage")}</h2>
        <button onClick={() => handleLanguageSelect("en")}>English</button>
        <button onClick={() => handleLanguageSelect("kn")}>ಕನ್ನಡ</button>
        <button onClick={() => handleLanguageSelect("hi")}>हिन्दी</button>
        <button onClick={() => handleLanguageSelect("te")}>తెలుగు</button>
        <button onClick={() => handleLanguageSelect("ta")}>தமிழ்</button>
        <button onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../assets/Vector.jpg";
import aboutIcon from "../assets/Frame.jpg";

const Header = ({ showBackButton = false, hideButtons = false }) => {
  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //   const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //   const toggleDropdown = () => {
  //     setIsDropdownOpen(!isDropdownOpen);
  //   };

  const handleHomeClick = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector(".main-content");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  //   const handleLanguageSelect = (language) => {
  //     setSelectedLanguage(language);
  //     setIsDropdownOpen(false);
  //   };

  const handleBackClick = () => {
    navigate(-1);
  };

  const shouldShowAuthButtons =
    !hideButtons &&
    !["/signup", "/login", "/parentdashboard"].includes(location.pathname);
  const shouldShowAboutButton =
    !hideButtons &&
    !["/signup", "/login", "/parentdashboard"].includes(location.pathname);

  return (
    <header className="headeR">
      <div className="header-lefT">
        <img src={logo} alt="Logo" className="logO" />
        <h1>
          <em>InsightEd</em>
        </h1>
      </div>
      <div className="header-centeR">
        {showBackButton ? (
          <button className="nav-buttoN" onClick={handleBackClick}>
            Back
          </button>
        ) : (
          <button onClick={handleHomeClick} className="nav-buttoN">
            Home
          </button>
        )}
        {shouldShowAboutButton && (
          <button className="nav-buttoN about-buttoN" onClick={scrollToAbout}>
            About Us
            {/* <img src={aboutIcon} alt="About Us Icon" className="about-icoN" /> */}
          </button>
        )}
      </div>
      <div className="header-righT">
        {/* <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Languages {selectedLanguage && (${selectedLanguage})}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Kannada')}>Kannada</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Hindi')}>Hindi</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Telugu')}>Telugu</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Tamil')}>Tamil</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('English')}>English</button>
            </div>
          )}
        </div> */}
        {shouldShowAuthButtons && (
          <>
            <button onClick={() => navigate("/login")} className="login-buttoN">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="signin-buttoN"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

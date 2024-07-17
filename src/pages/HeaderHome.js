import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HeaderHome.css';
import logo from '../assets/Vector.jpg'; // Adjust the path based on where you placed the image
import aboutIcon from '../assets/Frame.jpg'; // Adjust the path based on where you placed the icon

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Add state for selected language
  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation(); // Use the useLocation hook to get the current route

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHomeClick = () => {
    // Reload the whole application
    window.location.reload();
    // Scroll to the top of the page after reload
    window.scrollTo(-0.1, -0.1);
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('.main-content');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false); // Close the dropdown menu after selection
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the homepage
  };

  const shouldShowAuthButtons = location.pathname !== '/dashboard' && location.pathname !== '/dashboard';
  const shouldShowHomeButton = location.pathname !== '/dashboard' && location.pathname !== '/dashboard';

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1><em>InsightEd</em></h1>
      </div>
      <div className="header-center">
        {shouldShowHomeButton ? (
          <button onClick={handleHomeClick} className="nav-button">Home</button>
        ) : (
          <button className="nav-button" onClick={handleBackClick}>
            Back
          </button>
        )}
        {location.pathname !== '/dashboard' && location.pathname !== '/dashboard' && (
          <button className="nav-button about-button" onClick={scrollToAbout}>
            About Us
            <img src={aboutIcon} alt="About Us Icon" className="about-icon" />
          </button>
        )}
      </div>
      <div className="header-right">
        <div className="dropdown">
          {/* <button className="dropdown-button" onClick={toggleDropdown}>
            Languages {selectedLanguage && `(${selectedLanguage})`}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Kannada')}>Kannada</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Hindi')}>Hindi</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Telugu')}>Telugu</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('Tamil')}>Tamil</button>
              <button className="dropdown-item" onClick={() => handleLanguageSelect('English')}>English</button>
            </div>
          )} */}
        </div>
        {shouldShowAuthButtons && (
          <>
            <button onClick={() => navigate('/dashboard')} className="login-button">Login</button>
            <button onClick={() => navigate('/dashboard')} className="signin-button">Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
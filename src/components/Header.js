import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/Vector.jpg';
import aboutIcon from '../assets/Frame.jpg';

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
    const aboutSection = document.querySelector('.main-content');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

//   const handleLanguageSelect = (language) => {
//     setSelectedLanguage(language);
//     setIsDropdownOpen(false);
//   };

  const handleBackClick = () => {
    navigate(-1);
  };

  const shouldShowAuthButtons = !hideButtons && !['/signup', '/login', '/parentdashboard'].includes(location.pathname);
  const shouldShowAboutButton = !hideButtons && !['/signup', '/login', '/parentdashboard'].includes(location.pathname);

  return (
    <header className="Header">
      <div className="Header-left">
        <img src={logo} alt="Logo" className="Logo" />
        <h1><em>InsightEd</em></h1>
      </div>
      <div className="Header-center">
        {showBackButton ? (
          <button className="Nav-button" onClick={handleBackClick}>Back</button>
        ) : (
          <button onClick={handleHomeClick} className="Nav-button">Home</button>
        )}
        {shouldShowAboutButton && (
          <button className="Nav-button About-button" onClick={scrollToAbout}>
            About Us
            <img src={aboutIcon} alt="ABout Us Icon" className="About-icon" />
          </button>
        )}
      </div>
      <div className="Header-right">
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
            <button onClick={() => navigate('/login')} className="Login-button">Login</button>
            <button onClick={() => navigate('/signup')} className="Signin-button">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
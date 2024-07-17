// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Header.css';
// import logo from '../assets/Vector.jpg';
// import aboutIcon from '../assets/Frame.jpg';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleHomeClick = () => {
//     window.location.reload();
//     window.scrollTo(0, 0);
//   };

//   const scrollToAbout = () => {
//     const aboutSection = document.querySelector('.main-content');
//     if (aboutSection) {
//       aboutSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleLanguageSelect = (language) => {
//     setSelectedLanguage(language);
//     setIsDropdownOpen(false);
//   };

//   const handleBackClick = () => {
//     navigate('/'); // Navigate to the homepage
//   };

//   const shouldShowBackButton = location.pathname === '/parentdashboard'; // Show Back button only on mentor page

//   return (
//     <header className="header">
//       <div className="header-left">
//         <img src={logo} alt="Logo" className="logo" />
//         <h1><em>InsightEd</em></h1>
//       </div>
//       <div className="header-center">
//         {shouldShowBackButton ? (
//           <button className="nav-button" onClick={handleHomeClick}>Home</button>
//         ) : (
//           <button onClick={handleBackClick} className="nav-button">Back</button>
//         )}
//         {shouldShowBackButton && (
//           <button className="nav-button about-button" onClick={scrollToAbout}>
//             About Us
//             <img src={aboutIcon} alt="About Us Icon" className="about-icon" />
//           </button>
//         )}
//       </div>
//       <div className="header-right">
//         <div className="dropdown">
//           <button className="dropdown-button" onClick={toggleDropdown}>
//             Languages {selectedLanguage && `(${selectedLanguage})`}
//           </button>
//           {isDropdownOpen && (
//             <div className="dropdown-menu">
//               <button className="dropdown-item" onClick={() => handleLanguageSelect('Kannada')}>Kannada</button>
//               <button className="dropdown-item" onClick={() => handleLanguageSelect('Hindi')}>Hindi</button>
//               <button className="dropdown-item" onClick={() => handleLanguageSelect('Telugu')}>Telugu</button>
//               <button className="dropdown-item" onClick={() => handleLanguageSelect('Tamil')}>Tamil</button>
//               <button className="dropdown-item" onClick={() => handleLanguageSelect('English')}>English</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
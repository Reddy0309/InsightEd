import React, { useState, useEffect } from 'react';
import leftImage from '../assets/Rectangle 1.jpg';
import lineImage from '../assets/Line 1.jpg';
import insightLogo from '../assets/fi_9484251.jpg';
import Feedback from './Feedback';
import Cards from './Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Home.css';
import Header from './HeaderHome';
import Footer from './FooterHome';
import img1 from '../assets/ksit1.jpg';
import img2 from '../assets/ksit2.jpg';
import img3 from '../assets/ksit3.jpg';
import img4 from '../assets/ksit4.jpg';
import img5 from '../assets/ksit5.jpg';
import img6 from '../assets/ksit6.jpg';
import img7 from '../assets/ksit7.jpg';
import img8 from '../assets/ksit8.jpg';
import img9 from '../assets/ksit9.jpg';
import img10 from '../assets/ksit10.jpg';
import img11 from '../assets/ksit11.jpg';
import img12 from '../assets/ksit12.jpg';
import img13 from '../assets/ksit13.jpg';
import img14 from '../assets/ksit14.jpg';
import img15 from '../assets/ksit15.jpg';
import img16 from '../assets/ksit16.jpg';
import img17 from '../assets/ksit17.jpg';
import img18 from '../assets/ksit18.jpg';
import img19 from '../assets/ksit19.jpg';
import img20 from '../assets/ksit20.jpg';
import img21 from '../assets/ksit21.jpg';

const imageSources = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21,
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageSources.length);
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(-0.1, -0.1); // Scroll to the top of the page
  };

  useEffect(() => {
    scrollToTop();
  }, []); // Run only on component mount

  return (
    <div>
      <Header/>
      <div className="centered-images">
        {imageSources.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`sliding-image ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="main-content">
        <div className="left-section">
        <div className="content-section">
          <p className='About-content'>
            This website showcases InsightEd, an educational platform committed to empowering learners through community-driven insights and resources. Featuring a dynamic array of content, including community feedback, informative cards, and engaging visuals, InsightEd aims to foster informed decision-making and personal growth. From connecting on social media to exploring educational opportunities, InsightEd offers a comprehensive digital experience tailored for students, educators, and anyone seeking to navigate their educational journey with confidence and clarity.</p>
        </div>
          <p className="connect-text">Connect with us on</p>
          <div className="icon-buttons">
            <button className="icon-button">
              <a href="https://www.instagram.com/ksit.official/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
              </a>
            </button>
            <button className="icon-button">
              <a href="https://www.linkedin.com/school/k-s-institute-of-technology-bangalore/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="icon" />
              </a>
            </button>
            <button className="icon-button">
              <a href="https://www.facebook.com/ksit.official/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="icon" />
              </a>
            </button>
            <button className="icon-button">
              <a href="https://x.com/KSIT_official" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="icon" />
              </a>
            </button>
          </div>
        </div>
        <div className="right-section">
          <img src={leftImage} alt="Right Section" className="right-image" />
        </div>
      </div>
      <div className="bottom-block">
        <div className="bottom-left">
          <p style={{ fontSize: '1.5rem', color: '#9F72FF', marginLeft:'670px' }}>We are with you</p>
          <p style={{ fontSize: '3rem', color: '#FFFFFF',marginLeft:'250px' }}>InsightEd- Enhancing Educational Communication</p>
          {/* <img src={lineImage} alt="Line 1" className="line-image" /> */}
        </div>
      </div>
      <div className="Content-section">
        <div className="small-rect-block">
          <img src={insightLogo} alt="InSight ED Logo" className="insight-logo" />
          <p className="insight-text">InsightEd</p>
        </div>
        <p className="community-voices">Developer Talk</p>
        <Feedback />
        <Cards />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
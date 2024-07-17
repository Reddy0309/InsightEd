import React from 'react';
import './Footer.css';
import logo from '../assets/Vector-removebg-preview.png';
import icon1 from '../assets/Frame (1).jpg';
import icon2 from '../assets/Frame (2).jpg';
import icon3 from '../assets/Frame (3).jpg';
import icon4 from '../assets/Frame (4).jpg';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-left-content">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div className="footer-text title">InsightEd</div>
        <div className="footer-text description">
          Opportunities to network, collaborate, and learn from one another.
        </div>
        <div className="footer-icon-buttons">
        <a href="https://www.instagram.com/ksit.official/" target="_blank" rel="noopener noreferrer">
          <button className="footer-icon-button"><img src={icon1} alt="Icon 1" /></button>
          </a>
          <a href="https://www.linkedin.com/school/k-s-institute-of-technology-bangalore/" target="_blank" rel="noopener noreferrer">
          <button className="footer-icon-button"><img src={icon2} alt="Icon 2" /></button>
          </a>
          <a href="https://www.youtube.com/@niranjanbalaji9073" target="_blank" rel="noopener noreferrer">
          <button className="footer-icon-button"><img src={icon3} alt="Icon 3" /></button>
          </a>
          <a href="https://x.com/KSIT_official" target="_blank" rel="noopener noreferrer">
          <button className="footer-icon-button"><img src={icon4} alt="Icon 4" /></button>
          </a>
        </div>
      </div>
      <div className="footer-right-content">
        <div className="footer-column Color">
          <h4>Important Links</h4>
          <ul>
          <a href="https://www.ksit.ac.in/" target="_blank" rel="noopener noreferrer"><li>KSIT</li></a>
          <a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer"><li>AICTE</li></a>
          <a href="https://vtu.ac.in/" target="_blank" rel="noopener noreferrer"><li>VTU</li></a>
          </ul>
        </div>
        <div className="footer-column Color">
          <h4>Quick Links</h4>
          <ul>
          <a href="https://www.ksit.ac.in/career.html" target="_blank" rel="noopener noreferrer"><li>Careers</li></a>
          <a href="https://www.ksit.ac.in/onlineadmissions.html" target="_blank" rel="noopener noreferrer"><li>Online Admissions</li></a>
          <a href="https://easypay.axisbank.co.in/easyPay/makePayment?mid=MjYyODM%3D" target="_blank" rel="noopener noreferrer"><li>Online Fee Payment</li></a>
          <a href="https://www.ksit.ac.in/contact.html" target="_blank" rel="noopener noreferrer"><li>Contact</li></a>
          </ul>
        </div>
        <div className="footer-column Color">
          <h4>Group of Institutions</h4>
          <ul>
          <a href="https://ksgi.edu.in/" target="_blank" rel="noopener noreferrer"><li>KSGI</li></a>
          <a href="https://www.kssem.edu.in/" target="_blank" rel="noopener noreferrer"><li>KSSEM</li></a>
          <a href="https://www.kssa.edu.in/" target="_blank" rel="noopener noreferrer"><li>KSSA</li></a>
          <a href="https://kspolytechnic.edu.in/" target="_blank" rel="noopener noreferrer"><li>KSP</li></a>
          <a href="https://ksgi.edu.in/Best-PU-College-kspuc#" target="_blank" rel="noopener noreferrer"><li>KSP</li></a>
          </ul>
        </div>
        <div className="footer-column Color">
          <h4>Others</h4>
          <ul>
          <a href="https://www.google.co.in/search?rlz=1C1CHBD_enIN746IN746&q=k+s+hospital+bangalore&sa=X&ved=0ahUKEwjb9J3t1qbWAhXHso8KHQ1aAggQ1QIImQEoAA&biw=1366&bih=662" target="_blank" rel="noopener noreferrer"><li>KS Hospital</li></a>
          <a href="http://www.kammavaricreditsociety.com/" target="_blank" rel="noopener noreferrer"><li>KS Co-op Bank</li></a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
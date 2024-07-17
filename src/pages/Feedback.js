import React from 'react';
import './Feedback.css';
import standardImage from '../assets/Rectangle 395.jpg'; // Adjusted filename and path

import ellipse1 from '../assets/1.jpg';
import ellipse2 from '../assets/2.jpg';
import ellipse3 from '../assets/2.jpg';
import ellipse4 from '../assets/1.jpg';
import ellipse5 from '../assets/2.jpg';
import ellipse6 from '../assets/2.jpg';

const Feedback = () => {
  return (
    <section className="feedback-section">
      <div className="feedback-row reverse">
        <div className="feedback">
          <img src={standardImage} alt="Feedback 1" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content" >
            MongoDB: Cross-platform Document<br></br>-Oriented Database.MongoDB is a NoSQL <br></br>database where each record is a document<br></br>comprising of key-value pairs that are<br></br>similar to JSON (JavaScript Object<br></br>Notation) objects.
            </p>
          </div>
          <img src={ellipse1} alt="Ellipse 1" className="ellipse-image" />
          <span className="person-name">REDDY TEJASWINI A</span>
        </div>
        <div className="feedback">
          <img src={standardImage} alt="Feedback 2" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content">
            ExpressJS: Express is a Node.js framework.<br></br>Rather than writing the code using Node.js<br></br>and creating loads of Node modules,<br></br>Express makes it simpler and easier to<br></br>write the back-end code.
            </p>
          </div>
          <img src={ellipse2} alt="Ellipse 2" className="ellipse-image" />
          <span className="person-name">UJWAL M L</span>
        </div>
        <div className="feedback">
          <img src={standardImage} alt="Feedback 3" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content">
            React: Front-End Library
            React is a JavaScript<br></br>library that is used for building user<br></br>interfaces. React is used for the development<br></br>of single-page applications and mobile<br></br>applications because of its ability to<br></br> handle rapidly changing data.
            </p>
          </div>
          <img src={ellipse3} alt="Ellipse 3" className="ellipse-image" />
          <span className="person-name">YASHAS GOWDA</span>
        </div>
      </div>
      <div className="feedback-row">
        <div className="feedback">
          <img src={standardImage} alt="Feedback A" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content">
            Node.js: JS Runtime Environment 
            Node.js<br/> provides a JavaScript Environment which<br/>allows the user to run their code on the<br/>server (outside the browser).
            </p>
          </div>
          <img src={ellipse4} alt="Ellipse 4" className="ellipse-image" />
          <span className="person-name">TEJASHREE GOWDA</span>
        </div>
        <div className="feedback">
          <img src={standardImage} alt="Feedback B" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content">
            Flask:
            Flask is a web framework that<br/> allows developers to build lightweight web<br/> applications quickly and easily with<br/> Flask Libraries.
            </p>
          </div>
          <img src={ellipse5} alt="Ellipse 5" className="ellipse-image" />
          <span className="person-name">KRISHNA GUDI</span>
        </div>
        <div className="feedback">
          <img src={standardImage} alt="Feedback C" className="feedback-image" />
          <div className="feedback-text">
            <p className="feedback-content">
            Python:
            Python is a high-level, general-<br/>purpose, and very popular programming<br/> language. Python programming language<br/> is being used in web development,<br/> and Machine Learning applications.
            </p>
          </div>
          <img src={ellipse6} alt="Ellipse 6" className="ellipse-image" />
          <span className="person-name">GK</span>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
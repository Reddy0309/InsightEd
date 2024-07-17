import React, { useRef, useEffect } from 'react';
import './Cards.css';
import backgroundImage from '../assets/Feature Container.jpg';
import groupImage from '../assets/Group 56.jpg';
import innerGroupImage1 from '../assets/Group 56 (1).jpg';
import innerGroupImage2 from '../assets/Vector (1).jpg';
import innerGroupImage3 from '../assets/Vector (2).jpg';
import innerGroupImage4 from '../assets/Vector (3).jpg';

const Cards = () => {
  // Refs for each card element
  const cardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Function to observe intersection
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        observer.unobserve(entry.target);
      }
    });
  };

  // Effect to set up IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    cardRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="cards">
      <div className="card" ref={cardRefs[0]} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-front">
          <div className="image-container">
            <img src={groupImage} alt="Group 56" className="group-image" />
            <img src={innerGroupImage1} alt="Inner Group 1" className="inner-group-image" />
          </div>
          <p className="card-text">VISION</p>
        </div>
        <div className="card-back">
          <p className="card-description">To impart quality technical education with ethical values, employable skills and research to achieve excellence.</p>
        </div>
      </div>
      <div className="card" ref={cardRefs[1]} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-front">
          <div className="image-container">
            <img src={groupImage} alt="Group 56" className="group-image" />
            <img src={innerGroupImage2} alt="Inner Group 2" className="inner-group-image" />
          </div>
          <p className="card-text">MISSION</p>
        </div>
        <div className="card-back">
          <p className="card-description">To attract and retain highly qualified, experienced and committed faculty.To create relevant infrastructure
</p>
        </div>
      </div>
      <div className="card" ref={cardRefs[2]} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-front">
          <div className="image-container">
            <img src={groupImage} alt="Group 56" className="group-image" />
            <img src={innerGroupImage3} alt="Inner Group 3" className="inner-group-image" />
          </div>
          <p className="card-text">OBJECTIVES</p>
        </div>
        <div className="card-back">
          <p className="card-description">To keep all the infrastructure updated and relevant at any given point of time.To provide practical exposes through industry connect.
</p>
        </div>
      </div>
      <div className="card" ref={cardRefs[3]} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card-front">
          <div className="image-container">
            <img src={groupImage} alt="Group 56" className="group-image" />
            <img src={innerGroupImage4} alt="Inner Group 4" className="inner-group-image" />
          </div>
          <p className="card-text">CORE VALUES</p>
        </div>
        <div className="card-back">
          <p className="card-description">Quality Education
Honesty and Integrity
Research Work and self Improvement
Leadership and Entrepreneurship</p>
        </div>
      </div>
    </section>
  );
};

export default Cards;
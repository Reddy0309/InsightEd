import React, { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import Header from parentdashboard.js
import Footer from './FooterHome'; // Import Footer from parentdashboard.js
import './dashboard.css'; // Import dashboard.css for styling
const MentorTalk = (  ) => {
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
//   const location = useLocation();
  const user=JSON.parse(localStorage.getItem('student'))
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  console.log(user)
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/msg/send', { sender: user['NAME OF THE MENTOR'], receiver: user.USN,message: message });
        setInfo(response.data.message);
        console.log(response.data)
    } catch (error) {
      setInfo(error.response?.data?.message || 'Message Not Sent');
    }
    }
  };
  const handleGoBack = () => {
    navigate('/mentorpage');
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mentor"))
    if(!user){
      alert("Please login first!");
      navigate('/');
    }
  }, [ navigate ]);
  return(
    <div className="parent-dashboard-page"> {/* Apply parent-dashboard-page class */}
      <Header showBackButton={true} hideButtons={true} /> {/* Include Header component */}
      <div className="dashboard-container"> {/* Apply dashboard-container class */}
        <h2 className="dashboard-welcome">Chat with Parent</h2> {/* Apply dashboard-welcome class */}
        <div className="button-row"> {/* Apply button-row class */}
          {/* Include additional UI elements as needed */}
        </div>
        <div>
          {messages.map((msg, index) => (
            <p key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>{msg}</p>
          ))}
        </div>
        <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="texttalk" // Apply texttalk class for styling
          />
          <button type="submit" className="action-button">Send</button> {/* Apply action-button class */}
        </form>
        <button onClick={handleGoBack} className="goBAck">Go Back</button> {/* Apply goBack class */}
        {info && <p>{info}</p>}
      </div>
      <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default MentorTalk;




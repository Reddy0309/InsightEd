import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import Header from parentdashboard.js
import Footer from './FooterHome'; // Import Footer from parentdashboard.js
import './dashboard.css'; // Import dashboard.css for styling
const MessageComponent = () => {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState('');
const navigate = useNavigate();
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem('student'));
    const mentor = JSON.parse(localStorage.getItem('mentor'));

    if (!student || !mentor) {
      setInfo('Student or Mentor information is missing.');
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/msg/see', {
          name: mentor.name,
          usn: student.USN
        });

        if (isMounted) {
          setMessages(response.data);
          
        }
        console.log(response.data);
      } catch (error) {
        if (isMounted) {
          setInfo(error.response?.data?.message || 'Message Not Sent');
        }
      }
    };

    fetchData();
   
    return () => {
      isMounted = false;
    };
  }, []);
  const handleGoBack = () => {
    navigate('/mentorpage');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div className="parent-dashboard-page"> {/* Apply parent-dashboard-page class */}
      <Header showBackButton={true} hideButtons={true} /> {/* Include Header component */}
      <div className="dashboard-container"> {/* Apply dashboard-container class */}
        <h2 className="dashboard-welcome MessParent">Messages from the Parent</h2> {/* Apply dashboard-welcome class */}
        <div className="button-row"> {/* Apply button-row class */}
          <button onClick={handleGoBack} className="gOBack">Go Back</button> {/* Apply goBack class */}
        </div>
        <div style={{ maxHeight: '400px', overflowY: 'auto', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          {info && <p>{info}</p>}
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto' }}>
              {index + 1}. {msg.message}
              <br />
              <small>{formatTimestamp(msg.timestamp)}</small>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Include Footer component */}
    </div>
  );
};
export default MessageComponent;

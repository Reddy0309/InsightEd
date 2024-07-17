import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming Header.js exists in the correct location
import Footer from './Footer'; // Assuming Footer.js exists in the correct location
import './AnalysisPage.css'; // Import the CSS file for styling

const AnalysisPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [top5, setTop5] = useState([]);
    const [least5, setLeast5] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadSuccess(false);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('username', 'user1');

            try {
                const response = await axios.post('http://localhost:5000/api/mentors/analysis-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Server response:', response.data);
                alert('File uploaded successfully!');
                setUploadSuccess(true);
                setSelectedFile(null);
                setError('');

                const { data } = response.data; 
                if (Array.isArray(data)) {
                    analyzeData(data); 
                } else {
                    setError('Received data is not in the expected format.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('Failed to upload file. Please try again.');
            }

        } else {
            setError('Please select a file to upload.');
        }
    };

    const analyzeData = (data) => {
        const sortedData = [...data].sort((a, b) => b.SUM - a.SUM); 
        const top5Students = sortedData.slice(0, 5);
        const least5Students = sortedData.slice(-5);

        setTop5(top5Students);
        setLeast5(least5Students);
        setShowResults(true); 
    };

    const handleSendNotifications = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/msg/send-notifications', {
                students: least5
            });
            console.log(response);
            alert('PTM notification sent to the parents');
        } catch (error) {
            console.error('Error sending notifications:', error);
            alert('Failed to send PTM notifications. Please try again.');
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px'
    };

    const thStyle = {
        border: '1px solid black',
        padding: '8px',
        backgroundColor: '#f2f2f2'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '8px'
    };

    const handleGoBack = () => {
        navigate('/mentorpage');
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("mentor"));
        if (!user) {
            alert("Please login first!");
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <Header showBackButton={true} hideButtons={true} /> {/* Use Header component */}
            <div className="signuP-pagE"> {/* Apply signup-Page class */}
                <div className="signuP-containeR"> {/* Apply signup-Container class */}
                    <h2 className='h6'>Conduct Analysis</h2>
                    <br />

                    <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
                        <input type="file" onChange={handleFileChange} className="ChoosE" />
                        <br />
                        <br />
                        <button type="submit" className="signuP-buttoN">Upload File</button>
                    </form>
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {showResults && (
                        <div style={{ display: 'flex', justifyContent: 'space-around', gap:'30px' }}>
                            <div>
                                <h3>TOP 5</h3>
                                <table style={tableStyle} classname='Table1'>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>Rank</th>
                                            <th style={thStyle}>USN</th>
                                            <th style={thStyle}>Name</th>
                                            <th style={thStyle}>Sum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {top5.map((student, index) => (
                                            <tr key={index}>
                                                <td style={tdStyle}>{index + 1}</td>
                                                <td style={tdStyle}>{student.USN}</td>
                                                <td style={tdStyle}>{student.Name}</td>
                                                <td style={tdStyle}>{student.SUM}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3>LEAST 5</h3>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>Rank</th>
                                            <th style={thStyle}>USN</th>
                                            <th style={thStyle}>Name</th>
                                            <th style={thStyle}>Sum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {least5.map((student, index) => (
                                            <tr key={index}>
                                                <td style={tdStyle}>{index + 1}</td>
                                                <td style={tdStyle}>{student.USN}</td>
                                                <td style={tdStyle}>{student.Name}</td>
                                                <td style={tdStyle}>{student.SUM}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <br />
                    <br />
                    <button onClick={handleSendNotifications} className="signuP-buttoN PTM">Send PTM Notification</button>
                    <br />
                    <button onClick={handleGoBack} className="signuP-buttoN BacK">Go Back</button>
                </div>
            </div>
            <Footer /> {/* Use Footer component */}
        </div>
    );
};

export default AnalysisPage;

// src/components/UploadPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Assuming Header.js exists in the correct location
import Footer from "./Footer"; // Assuming Footer.js exists in the correct location
import "./UploadSheets.css"; // Import the CSS file for styling

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mentor"));
    if (!user) {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", "user1"); // Replace with actual username

    try {
      const response = await axios.post("/api/mentors/upload-sheet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Excel sheet uploaded successfully");
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />{" "}
      {/* Use Header component */}
      <div className="signuP-Page">
        {" "}
        {/* Apply signup-Page class */}
        <div className="signuP-Container">
          {" "}
          {/* Apply signup-Container class */}
          <h2 className="h4">Upload File</h2>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input type="file" className="choose" onChange={handleFileChange} />
            <br />
            <button type="submit" className="signuP-Button">
              Post
            </button>{" "}
            {/* Apply signup-Button class */}
          </form>
          <br />
          <button
            onClick={() => navigate("/mentorpage")}
            className="signuP-Button back"
          >
            Go Back
          </button>{" "}
          {/* Apply signup-Button class */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
      <Footer /> {/* Use Footer component */}
    </div>
  );
};

export default UploadPage;

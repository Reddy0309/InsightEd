import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./FeedPage.css"; // Import the new CSS file

const listStyle = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  marginBottom: "10px",
  background: "#f9f9f9",
  padding: "10px",
  borderRadius: "4px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

// const buttonStyle = {
//   marginTop: '10px',
//   border: 'none',
//   backgroundColor: '#B322DC',
//   color: 'white',
//   borderRadius: '20px',
//   cursor: 'pointer',
//   padding: '10px 20px',
// };

// const buttonHoverStyle = {
//   backgroundColor: '#4ADC22',
// };

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelSheets: [],
    };
  }

  componentDidMount() {
    this.fetchExcelSheets();
  }

  fetchExcelSheets = async () => {
    try {
      const response = await axios.get("/api/mentors/files");
      this.setState({ excelSheets: response.data });
    } catch (error) {
      console.error("Error fetching latest Excel sheets:", error);
    }
  };

  handleRefresh = () => {
    this.fetchExcelSheets();
  };

  handleDownload = async (filePath, fileName) => {
    try {
      const response = await axios.get(`${filePath}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  render() {
    const { excelSheets } = this.state;

    return (
      <div>
        <Header showBackButton={true} hideButtons={true} />
        <div className="feed-Page">
          <div className="feed-Container">
            <h2>Feed</h2>
            {excelSheets.length > 0 ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p style={{ color: "#5D22DC" }}>All Uploaded Excel Sheets:</p>
                <ul style={listStyle}>
                  {excelSheets.map((sheet, index) => (
                    <li key={index} style={listItemStyle}>
                      <div>
                        <p>{sheet.filename}</p>
                        <p style={{ fontSize: "12px", color: "#777" }}>
                          Uploaded at:{" "}
                          {new Date(sheet.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="feed-Button"
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#4ADC22")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#B322DC")
                        }
                        onClick={() =>
                          this.handleDownload(sheet.path, sheet.filename)
                        }
                      >
                        Download to Edit
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p style={{ color: "white" }}>No Excel sheets uploaded yet.</p>
            )}
            <button className="feed-Button" onClick={this.handleRefresh}>
              Refresh
            </button>
            <button
              className="feed-Button"
              style={{ marginTop: "10px" }}
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FeedPage;

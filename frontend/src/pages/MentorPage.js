import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./MentorPage.css"; // Import the same CSS file used by FeedPage

const MentorPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState("");
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchResult, setSearchResult] = useState(null);
  const mentor = JSON.parse(localStorage.getItem("mentor"));

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/stufilter/filter", {
          name: mentor.name,
        });
        if (isMounted) {
          setStudents(response.data.students);
        }
      } catch (error) {
        if (isMounted) {
          setInfo(error.response?.data?.message || "Message Not Sent");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateSheets = () => {
    navigate("/feed");
  };

  const handleConductAnalysis = () => {
    navigate("/conduct-analysis");
  };

  const handleLogOut = () => {
    localStorage.removeItem("mentor");
    navigate("/");
  };

  const handleMessage = (student) => {
    localStorage.setItem("student", JSON.stringify(student));
    navigate("/message");
  };

  const handleTalkToParent = (student) => {
    localStorage.setItem("student", JSON.stringify(student));
    navigate("/mentor-talk", { state: { student: student, mentor: mentor } });
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const result = students.find(
      (student) => student.USN.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResult(result);
  };
  const handleClearSearch = () => {
    setSearchResult(null); // Clear search result
  };

  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />
      <div className="Feed-Page">
        <div className="Feed-Container">
          <h2>Welcome, {mentor.name}!</h2>
          <h2>Mentor Options</h2>
          <button
            className="Feed-Button"
            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
            // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
            onClick={() => navigate("/upload-sheet")}
          >
            Broadcast Sheets
          </button>
          <br />
          <button
            className="Feed-Button"
            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
            // // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
            onClick={() => navigate("/gen-report")}
          >
            Generate Report
          </button>
          <br />
          <button
            className="Feed-Button"
            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
            // // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
            onClick={handleUpdateSheets}
          >
            Update Sheets
          </button>
          <br />
          <button
            className="Feed-Button"
            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
            // // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
            onClick={handleConductAnalysis}
          >
            Conduct Analysis
          </button>
          <br />
          <button
            className="Feed-Button"
            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
            // // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <br />
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "80%", textAlign: "left" }}>
              <div>
                {messages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            </div>
            <div
              style={{ width: "80%", textAlign: "center", marginTop: "20px" }}
            >
              <p>
                <strong>
                  Click on the USN or the Student Name to open messages from
                  their parents. Click on Talk to Parent to contact the parent.
                </strong>
              </p>
              <h3>Students</h3>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Search by USN"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ padding: "8px", width: "80%" }}
                />
                <button
                  onClick={handleSearchSubmit}
                  style={{
                    padding: "8px",
                    marginLeft: "10px",
                    backgroundColor: "#c877e8",
                    color: "#FFFFFF",
                    marginTop: "10px",
                  }}
                >
                  Search
                </button>
              </div>
              {searchResult && (
                <div style={{ marginBottom: "20px" }}>
                  <h3>Search Result</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <table
                      style={{
                        width: "50%",
                        borderCollapse: "collapse",
                        alignItems: "center",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            USN
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Name
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Talk to Parent
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult && (
                          <tr style={{ cursor: "pointer" }}>
                            <td
                              onClick={() => handleMessage(searchResult)}
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {searchResult.USN}
                            </td>
                            <td
                              onClick={() => handleMessage(searchResult)}
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {searchResult["NAME OF THE STUDENT"]}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              <button
                                className="Talk"
                                onMouseOver={(e) =>
                                  (e.target.style.backgroundColor = "#4ADC22")
                                }
                                onClick={() => handleTalkToParent(searchResult)}
                              >
                                Talk to Parent
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {searchResult && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        className="Feed-Button"
                        style={{
                          backgroundColor: "#c877e8",
                          color: "#FFFFFF",
                          marginTop: "10px",
                        }}
                        onClick={handleClearSearch}
                      >
                        Clear Search Results
                      </button>
                    </div>
                  )}
                  <br />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <table
                  style={{
                    width: "50%",
                    borderCollapse: "collapse",
                    alignItems: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          width: "300%",
                        }}
                      >
                        USN
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          width: "300%",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          width: "300%",
                        }}
                      >
                        Talk to Parent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu, index) => (
                      <tr key={index} style={{ cursor: "pointer" }}>
                        <td
                          onClick={() => handleMessage(stu)}
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            width: "10%",
                          }}
                        >
                          {stu.USN}
                        </td>
                        <td
                          onClick={() => handleMessage(stu)}
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            width: "30%",
                          }}
                        >
                          {stu["NAME OF THE STUDENT"]}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            width: "20%",
                          }}
                        >
                          <button
                            className="Talk"
                            // onMouseOver={(e) => (e.target.style.backgroundColor = '#4ADC22')}
                            // // onMouseOut={(e) => (e.target.style.backgroundColor = '#B322DC')}
                            onClick={() => handleTalkToParent(stu)}
                          >
                            Talk to Parent
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorPage;

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./genReport.css";

const generatePDF = async (headers, studentDetails) => {
  const pdfDoc = await PDFDocument.create();

  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  let yPosition = 800;

  const usn = studentDetails[1];
  const name = studentDetails[2];

  page1.drawText(`USN: ${usn}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  yPosition -= 15;

  const remainingDetails = headers.slice(2).map((header, index) => {
    let detail = studentDetails[index + 2];
    if (header.startsWith("FACULTY")) {
      detail = detail.split("\n")[0];
    }
    return `${header}: ${detail}`;
  });

  const midpoint = Math.ceil(remainingDetails.length / 2);

  const detailsPage1 = remainingDetails.slice(0, midpoint).join("\n");
  const detailsPage2 = remainingDetails.slice(midpoint).join("\n");

  page1.drawText(`${detailsPage1}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  const page2 = pdfDoc.addPage([595.28, 841.89]);
  yPosition = 800;

  page2.drawText(`${detailsPage2}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const pdfFileName = `Student_Report_${timestamp}.pdf`;

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = pdfFileName;
  link.click();
};

const sendReportToParent = async (usn, name, headers, studentDetails) => {
  try {
    const user = JSON.parse(localStorage.getItem("mentor"));
    const pdfDoc = await PDFDocument.create();

    const page1 = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    let yPosition = 800;

    const usn = studentDetails[1]; // Assuming USN is the first column
    const name = studentDetails[2]; // Assuming Name is the second column

    page1.drawText(`USN: ${usn}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    yPosition -= 15;

    const remainingDetails = headers.slice(2).map((header, index) => {
      let detail = studentDetails[index + 2];
      if (header.startsWith("FACULTY")) {
        detail = detail.split("\n")[0];
      }
      return `${header}: ${detail}`;
    });

    const midpoint = Math.ceil(remainingDetails.length / 2);

    const detailsPage1 = remainingDetails.slice(0, midpoint).join("\n");
    const detailsPage2 = remainingDetails.slice(midpoint).join("\n");

    page1.drawText(`${detailsPage1}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const page2 = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    yPosition = 800;

    page2.drawText(`${detailsPage2}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const response = await axios.post("/api/msg/send", {
      sender: user.name,
      receiver: studentDetails[1],
      message: link.href,
    });
    alert(`Sending report to parent of student: USN - ${usn}, Name - ${name}`);
  } catch (error) {}
};

const GenReport = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const students = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = students[0];
      const studentDetails = students.slice(1);

      setHeaders(headers);
      setStudentsData(studentDetails);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleGoBack = () => {
    navigate("/mentorpage");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mentor"));
    if (!user) {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Header showBackButton={true} hideButtons={true} />
      <div className="signuP-PagE">
        <div className="signuP-ContaineR">
          <h2 className="h5">Generate Report</h2>
          <br />
          <br />
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="Choose"
          />
          <p>Select an Excel file to generate the report.</p>
          <button onClick={handleGoBack} className="signuP-ButtoN Back">
            Go Back
          </button>
          <p className="p">
            <b>
              Scroll down to Generate and Download Reports in PDf format and
              send the reports to the respective parents
            </b>
          </p>
          {studentsData.map((student, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p>{`Student ${index + 1}: ${student.slice(1).join(", ")}`}</p>
              <button
                onClick={() => generatePDF(headers, student)}
                className="signuP-ButtoN gen"
              >
                Generate PDF
              </button>
              <button
                onClick={() =>
                  sendReportToParent(student[0], student[1], headers, student)
                }
                className="signuP-ButtoN rep"
              >
                Send Report to Parent
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenReport;

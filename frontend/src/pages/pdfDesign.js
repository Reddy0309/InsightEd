import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const designPDF = async (pdfDoc, headers, studentDetails) => {
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const lineHeight = 15;

  // Centered Heading
  page.drawText("K. S. INSTITUTE OF TECHNOLOGY", {
    x: page.getWidth() / 2 - 150, // Centered horizontally
    y: page.getHeight() - 50,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
    textAlign: "center",
  });

  // Centered Address
  page.drawText("Kanakapura, Bangalore - 560109", {
    x: page.getWidth() / 2 - 100, // Centered horizontally
    y: page.getHeight() - 70,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
    textAlign: "center",
  });

  // Draw a line below the header
  page.drawLine({
    start: { x: 50, y: page.getHeight() - 80 },
    end: { x: page.getWidth() - 50, y: page.getHeight() - 80 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  let yPosition = page.getHeight() - 100;

  // Extract USN and Name (assuming their positions are fixed)
  const usn = studentDetails[0]; // Assuming USN is the first column
  const name = studentDetails[1]; // Assuming Name is the second column

  // Add USN and Name to the first page
  page.drawText(`USN: ${usn}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight * 1.5;

  page.drawText(`Name: ${name}`, {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  yPosition -= lineHeight * 2;

  // Draw remaining student details
  headers.slice(2).forEach((header, index) => {
    const detail = studentDetails[index + 2];
    if (yPosition <= 50) {
      // Add a new page if text overflows
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      yPosition = newPage.getHeight() - 50;
      page.drawText("K. S. INSTITUTE OF TECHNOLOGY", {
        x: newPage.getWidth() / 2 - 150,
        y: newPage.getHeight() - 50,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        textAlign: "center",
      });
      yPosition -= lineHeight * 2;
    }
    page.drawText(`${header}: ${detail}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight * 1.5; // Adjust line height with 1.5 spacing
  });
};

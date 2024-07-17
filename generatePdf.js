// backend/generatePDFs.js
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import * as XLSX from 'xlsx';

const excelFilePath = '"C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/VI SEM B SEC IA MARKS SHEET.xlsx"'; // Update with your Excel file path
const templateFilePath = '"C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/template.pdf"'; // Update with your PDF template path
const outputDir = 'C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/res pdfs'; // Update with the directory where PDFs will be saved

const generatePDFs = async () => {
    try {
        // Read Excel file
        const workbook = XLSX.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Extract data from Excel sheet
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Load PDF template
        const templateBytes = await fs.promises.readFile(templateFilePath);
        const pdfDoc = await PDFDocument.load(templateBytes);

        // Iterate through data and generate PDFs
        for (let student of data) {
            const { usn, name, attendance, marks } = student;

            // Clone the template page
            const pages = pdfDoc.getPages();
            const page = pages[0]; // Assuming there's only one page in the template
            const { width, height } = page.getSize();
            const newPage = pdfDoc.addPage([width, height]);

            // Write student data to PDF
            newPage.drawText(`USN: ${usn}`, { x: 50, y: height - 100 });
            newPage.drawText(`Name: ${name}`, { x: 50, y: height - 120 });
            newPage.drawText(`Attendance: ${attendance}`, { x: 50, y: height - 140 });
            newPage.drawText(`Marks: ${marks}`, { x: 50, y: height - 160 });

            // Save PDF to file
            const pdfBytes = await pdfDoc.save();
            const outputPath = path.join(outputDir, `${name}_${usn}.pdf`);
            await fs.promises.writeFile(outputPath, pdfBytes);
            console.log(`Generated PDF for ${name} (${usn})`);
        }

        console.log('PDF generation complete.');
    } catch (error) {
        console.error('Error generating PDFs:', error);
    }
};

generatePDFs();

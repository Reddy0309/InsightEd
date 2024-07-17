// frontend/src/components/ExcelViewer.js
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewer = ({ filePath }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000${filePath}`);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setData(jsonData);
            };

            reader.readAsArrayBuffer(blob);
        };

        fetchData();
    }, [filePath]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>Excel Viewer</h2>
            <input type="file" onChange={handleFileChange} />
            <table>
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => <td key={i}>{value}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelViewer;

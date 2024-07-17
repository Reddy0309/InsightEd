import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Replace with your actual JWT
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZDJlNDJjYi03OTg1LTQzM2QtYmUwYy0yOGE1ODg3MjE2NGQiLCJlbWFpbCI6InJlZGR5dGVqYXN3aW5pMDQzMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjM4MmMyN2E2Y2M4ZTViMTkxNjciLCJzY29wZWRLZXlTZWNyZXQiOiI4NTcxOTcwZjA5MDY0ZThlZmQyM2EwMjljNjMxY2YwMmM4NzQwNTRkZDlhZDI2ZTMwMjJkOWEwM2E4YTZlOTRiIiwiaWF0IjoxNzE4NTMwMDYyfQ.9x8FcocHG30gmNX2AzojqleGpDE7LImV9vQAlFR3X3Q';

// Function to upload file to Pinata
async function uploadToPinata(filePath) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const metadata = JSON.stringify({
        name: 'MyDocument',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0
    });
    data.append('pinataOptions', pinataOptions);

    try {
        const response = await axios.post(url, data, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                Authorization: `Bearer ${JWT}`
            }
        });
        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Path to the document you want to upload
const filePath = 'C:\\Users\\rteja\\OneDrive\\Desktop\\6\\MINIPROJECT\\prog1.pdf';

uploadToPinata(filePath);

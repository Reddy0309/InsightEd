// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';

// const CameraCapture = () => {
//     const webcamRef = useRef(null);
//     const [status, setStatus] = useState('Initializing...');
//     const [modelsLoaded, setModelsLoaded] = useState(false);
//     const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);

//     useEffect(() => {
//         const loadModels = async () => {
//             setStatus('Loading models');
//             await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//             await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//             await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

//             const createLabeledDescriptors = async () => {
//                 const labeledDescriptors = [];
//                 const imageUrls = ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg'];
//                 const labels = ['Person 1', 'Person 2', 'Person 3', 'Person 4']; // Example labels
                
//                 for (let i = 0; i < imageUrls.length; i++) {
//                     try {
//                         const img = await faceapi.fetchImage(imageUrls[i]);
//                         const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//                         if (detections) {
//                             labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(labels[i], [detections.descriptor]));
//                         } else {
//                             console.error(`No face detected in image: ${imageUrls[i]}`);
//                         }
//                     } catch (error) {
//                         console.error(`Error processing image ${imageUrls[i]}:`, error);
//                     }
//                 }
//                 return labeledDescriptors;
//             };

//             const descriptors = await createLabeledDescriptors();
//             setLabeledFaceDescriptors(descriptors);
//             setModelsLoaded(true);
//             setStatus('Models loaded, ready to capture');
//         };
//         loadModels();
//     }, []);

//     const capture = async () => {
//         if (!modelsLoaded) {
//             console.error('Models not loaded');
//             return;
//         }

//         const imageSrc = webcamRef.current.getScreenshot();
//         if (imageSrc) {
//             try {
//                 const capturedImg = await faceapi.fetchImage(imageSrc);
//                 const detectedFace = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();

//                 if (detectedFace) {
//                     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
//                     const bestMatch = faceMatcher.findBestMatch(detectedFace.descriptor);
//                     if (bestMatch.label !== 'unknown') {
//                         setStatus(`Login successful: ${bestMatch.label}`);
//                     } else {
//                         setStatus('Login unsuccessful');
//                     }
//                 } else {
//                     setStatus('No face detected');
//                 }
//             } catch (error) {
//                 console.error('Error during face detection:', error);
//                 setStatus('Error during face detection');
//             }
//         } else {
//             setStatus('Error capturing image from webcam');
//         }
//     };

//     return (
//         <div>
//             <h1>{status}</h1>
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//             />
//             <button onClick={capture} disabled={!modelsLoaded}>Capture</button>
//         </div>
//     );
// };

// export default CameraCapture;

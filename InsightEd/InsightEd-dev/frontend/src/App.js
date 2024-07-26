//App
import Home from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentDashboard from "./pages/parentdashboard";
import Register from "./components/Register";
// import CameraCapture from './components/CameraCapture';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import MentorDashboard from "./pages/mentordashboard";
import MentorPage from "./pages/MentorPage";
import AnalysisPage from "./components/AnalysisPage";
import Parent from "./pages/parentpage";
import Talk from "./pages/talk";
// import Rec from './components/SpeechToText';
import UploadSheet from "./components/UploadSheets";
import GenReport from "./pages/genReport";
import FeedPage from "./components/FeedPage";
import Message from "./pages/message";
import MentorTalk from "./pages/mentortalk";
import ViewMessages from "./pages/viewmessagefrmmentor";
import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
// import { io } from 'socket.io-client';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');
// export const SocketContext = React.createContext();
// // <!-- Add this to your HTML file or index.js where you initialize your React app -->
// <script src="https://cdn.jsdelivr.net/npm/face-api.js@2.3.0/dist/face-api.min.js"></script>

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      {/* <SocketContext.Provider value={socket}> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentorpage" element={<MentorPage />} />
          <Route path="/conduct-analysis" element={<AnalysisPage />} />
          <Route path="/parentdashboard" element={<ParentDashboard />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/capture" element={<CameraCapture />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/talk" element={<Talk />} />
          {/* <Route path="/record" element={<Rec />} /> */}
          <Route path="/upload-sheet" element={<UploadSheet />} />
          <Route path="/gen-report" element={<GenReport />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/message" element={<Message />} />
          <Route path="/mentor-talk" element={<MentorTalk />} />
          <Route path="/view-messages" element={<ViewMessages />} />
        </Routes>
      </Router>
      {/* </SocketContext.Provider> */}
    </I18nextProvider>
  );
};
export default App;

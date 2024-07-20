// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Example translation resources for English, Kannada, and Hindi
const resources = {
  en: {
    translation: {
      welcome: "Welcome to InsightEd Dashboard",
      enterParent: "Enter as Parent",
      enterMentor: "Enter as Mentor",
      selectLanguage: "Select Language",
      close: "Close",
      parentDashboard: "Parent Dashboard",
      mentorDashboard: "Mentor Dashboard",
      chooseEntry: "Make Choice",
      viewReportCard: "View Student Report Card",
      talkToMentor: "Talk to the Mentor",
      register: "Register",
      login: "Login",
      studentusn: "Student USN",
      password: "Password",
      goback: "Go Back",
      // Add more translations as needed
    },
  },
  kn: {
    translation: {
      welcome: "ಇನ್ಸೈಟ್ಎಡ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ಗೆ ಸ್ವಾಗತ",
      enterParent: "ತಂದೆ ಆಗಿ ಸೇರಿ",
      enterMentor: "ಮೆಂಟರ್ ಆಗಿ ಸೇರಿ",
      selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
      close: "ಮುಚ್ಚಿ",
      parentDashboard: "ತಂದೆ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      mentorDashboard: "ಮೆಂಟರ್ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      chooseEntry: "ಆಯ್ಕೆ ಮಾಡಿ",
      viewReportCard: "ವಿದ್ಯಾರ್ಥಿಗಳ ವರದಿ ಪಟ್ಟಿ ನೋಡಿ",
      talkToMentor: "ಮೆಂಟರ್‌ ಜೊತೆ ಮಾತನಾಡಿ",
      register: "ನೋಂದಣಿ",
      login: "ಲಾಗಿನ್ ಮಾಡಿ",
      studentusn: "విద్యార్థి USN",
      password: "ಗುಪ್ತಪದ",
      goback: "ಹಿಂದೆ ಹೋಗು",

      // Add more translations as needed
    },
  },
  hi: {
    translation: {
      welcome: "इंसाइटएड डैशबोर्ड में आपका स्वागत है",
      enterParent: "माता-पिता के रूप में प्रवेश करें",
      enterMentor: "मेंटर के रूप में प्रवेश करें",
      selectLanguage: "भाषा चुनें",
      close: "Close",
      parentDashboard: "माता-पिता डैशबोर्ड",
      mentorDashboard: "मेंटर डैशबोर्ड",
      chooseEntry: "कृपया चुनाव करें",
      viewReportCard: "विद्यार्थी रिपोर्ट कार्ड देखें",
      talkToMentor: "मेंटर से बात करें",
      register: "पंजीकरण करें",
      login: "लॉग इन करें",
      studentusn: "छात्र यू.एस.एन.",
      password: "पासवर्ड",
      goback: "वापस जाओ",
      // Add more translations as needed
    },
  },

  te: {
    translation: {
      welcome: "ఇన్సైట్ ఎడ్ డ్యాష్‌బోర్డుకు స్వాగతం",
      enterParent: "తల్లి లేదా తండ్రిగా ప్రవేశించండి",
      enterMentor: "మార్గదర్శకుడిగా ప్రవేశించండి",
      selectLanguage: "భాషను ఎంచుకోండి",
      close: "Close",
      parentDashboard: "తల్లిదండ్రుల డ్యాష్‌బోర్డ్",
      mentorDashboard: "మార్గదర్శకుడి డ్యాష్‌బోర్డ్",
      chooseEntry: "దయచేసి ఎంట్రీని ఎంచుకోండి",
      viewReportCard: "విద్యార్థి రిపోర్ట్ కార్డ్ చూడండి",
      talkToMentor: "సలహాదారులతో మాట్లాడండి",
      register: "నమోదు",
      login: "లాగిన్",
      studentusn: "విద్యార్థి USN",
      password: "పాస్వర్డ్",
      goback: "వెనక్కి వెళ్ళు",
      // Add more translations as needed
    },
  },

  ta: {
    translation: {
      welcome: "இன்சைட் எட் டாஷ்போர்டுக்கு வரவேற்கிறோம்",
      enterParent: "பெற்றோராக நுழையவும்",
      enterMentor: "துணை ஆலோசகராக நுழையவும்",
      selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்",
      close: "Close",
      parentDashboard: "பெற்றோர் கட்டுப்பாட்டு மையம்",
      mentorDashboard: "துணை ஆலோசகரின் கட்டுப்பாட்டு மையம்",
      chooseEntry: "தயவுசெய்து நுழைவினைத் தேர்ந்தெடுக்கவும்",
      viewReportCard: "மாணவர்களின் அறிக்கை அட்டையைப் பார்வையிடவும்",
      talkToMentor: "துணைசாதகருடன் பேசுங்கள்",
      register: "பதிவு செய்க",
      login: "உள்நுழை",
      studentusn: "மாணவர் USN",
      password: "கடவுச்சொல்",
      goback: "திரும்பி செல்",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation not found
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;

//stumentor.js
import mongoose from 'mongoose';

const stuMentorSchema = new mongoose.Schema({
    USN: { type: String, required: true },
    'NAME OF THE STUDENT': { type: String, required: true },
    'STUDENT CONTACT NUMBER': { type: String, required: true },
    'FATHER NAME': { type: String, required: true },
    'FATHER CONTACT NUMBER': { type: String, required: true },
    'MOTHER NAME': { type: String, required: true },
    'MOTHER CONTACT NUMBER': { type: String, required: true },
    'NAME OF THE MENTOR': { type: String, required: true },
});

const StuMentor = mongoose.model('StuMentor', stuMentorSchema);
export default StuMentor;

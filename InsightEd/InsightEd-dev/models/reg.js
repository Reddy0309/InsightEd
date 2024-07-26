// backend/models/Register.js
import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("regs", registerSchema);

export default Register;

//mongodb+srv://reddytejaswini0431:1tt6NPLPfrG5H1OW@cluster0.wrzz44j.mongodb.net/

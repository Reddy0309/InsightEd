// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    usn: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', userSchema);

export default User;
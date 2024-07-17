// models/Notification.js
import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
    usn: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export default model('Notification', NotificationSchema);

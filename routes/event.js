// // routes/notifyEvent.js
// import express from 'express';
// import Event from '../models/Event.js'; // Import the Event model

// const router = express.Router();

// // POST /api/notify
// // Notify all connected clients about an event
// router.post('/notify', async (req, res) => {
//   const { title, description } = req.body;

//   try {
//     // Save event to MongoDB using Mongoose
//     const newEvent = new Event({
//       title,
//       description,
//     });
//     await newEvent.save();

//     // Emit event to all connected clients using Socket.IO
//     req.io.emit('event_notification', {
//       title: newEvent.title,
//       description: newEvent.description,
//     });

//     res.status(200).json({ message: 'Event notified successfully' });
//   } catch (error) {
//     console.error('Error notifying event:', error.message);
//     res.status(500).json({ error: 'Failed to notify event' });
//   }
// });

// export default router;

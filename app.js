// app.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');
const callController = require('./controllers/call');
const ticketController = require('./controllers/ticket');
const notificationController = require('./controllers/notification');
const cors = require('cors'); // Import the cors package

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// User and Auth Routes
app.post('/register', userController.createUser);
app.post('/login', authController.login);
app.get('/users', userController.getUsersByRole);
app.get('/users/:id', userController.getUserById); // New route to fetch user by ID

// Call Routes
app.post('/calls', callController.createCall);
app.get('/calls', callController.getCalls);
app.get('/calls/:id', callController.getCallById); 
app.put('/calls/:id', callController.updateCall);

// Ticket Routes
app.post('/tickets', ticketController.createTicket);
app.put('/tickets/:id', ticketController.updateTicket);
app.get('/tickets', ticketController.getTickets);
app.get('/tickets/:id', ticketController.getTicketById);
app.get('/calls/:callId/tickets', ticketController.getTicketsByCallId);
app.post('/tickets/:ticketId/comments', ticketController.addCommentToTicket);
app.get('/tickets/:ticketId/comments', ticketController.getTicketComments); // Route for fetching comments

// Notification Routes
app.post('/notifications', notificationController.createNotification);
app.get('/notifications/:userId', notificationController.getNotifications);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

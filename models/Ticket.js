const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ticketSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    callId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Call',
        required: true, 
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In progress', 'Resolved'],
        default: 'open',
    },
    comments: [commentSchema], // Updated to include userId in comments
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

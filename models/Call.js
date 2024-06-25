// models/Call.js
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Call', callSchema);

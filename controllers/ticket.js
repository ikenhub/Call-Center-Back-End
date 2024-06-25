// controllers/ticket.js
const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('agentId');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTicketsByCallId = async (req, res) => {
    try {
        const tickets = await Ticket.find({ callId: req.params.callId }).populate('agentId');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCommentToTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { content, userId } = req.body;

    try {
        // Find the authenticated user based on userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the ticket by ticketId
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Add the comment to the ticket
        ticket.comments.push({
            content,
            userId,
            timestamp: new Date(),  // Add the timestamp here
        });

        // Save the updated ticket with the new comment
        await ticket.save();

        // Populate the user field in the comment
        await ticket.populate('comments.userId');

        // Return the newly added comment with the user object
        const newComment = ticket.comments[ticket.comments.length - 1];
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTicketComments = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const ticket = await Ticket.findById(ticketId).populate('comments.userId');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Extract the comments with user information populated
        const comments = ticket.comments.map(comment => ({
            _id: comment._id,
            content: comment.content,
            userId: {
                _id: comment.userId._id,
                name: comment.userId.name,
                // Add other user fields as needed
            },
            createdAt: comment.createdAt,
            // Include other comment fields as needed
        }));

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
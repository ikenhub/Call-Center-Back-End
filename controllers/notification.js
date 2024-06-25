// controllers/notification.js
const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
    try {
        const { userId, ticketId, message } = req.body;
        const notification = new Notification({
            userId,
            ticketId,
            message,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

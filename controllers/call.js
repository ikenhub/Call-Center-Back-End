const Call = require('../models/Call');

exports.createCall = async (req, res) => {
    try {
        const call = new Call(req.body);
        await call.save();
        res.status(201).json(call); // Respond with the saved call object
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCalls = async (req, res) => {
    try {
        const { agentId } = req.query; // Extract agentId from query parameters
        let query = {};

        if (agentId) {
            query.agentId = agentId; // Filter calls by agentId if provided
        }

        const calls = await Call.find(query).populate('agentId');
        res.json(calls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCallById = async (req, res) => {
    const callId = req.params.id;

    try {
        const call = await Call.findById(callId).populate('agentId');
        if (!call) {
            return res.status(404).json({ message: 'Call not found' });
        }
        res.json(call);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateCall = async (req, res) => {
    try {
        const { id } = req.params;
        const { time, duration, subject } = req.body;
        
        const updatedCall = await Call.findByIdAndUpdate(id, { time, duration, subject }, { new: true });
        
        if (!updatedCall) {
            return res.status(404).json({ message: 'Call not found' });
        }
        
        res.json(updatedCall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { email, name, password, role } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({ email, password: hashedPassword, name, role });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsersByRole = async (req, res) => {
    const { role } = req.query;

    try {
        const users = await User.find(role ? { role } : {});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
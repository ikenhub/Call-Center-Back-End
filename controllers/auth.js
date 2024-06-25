const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            'secret', // Replace with your actual secret key
            { expiresIn: '1h' }
        );
        res.json({ token, user }); // Include the entire user object in the response
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

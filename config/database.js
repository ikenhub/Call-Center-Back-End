const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mikelalboran:YuReSfPnFfZEY7YW@cluster0.ip7lrfc.mongodb.net/callCenter?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

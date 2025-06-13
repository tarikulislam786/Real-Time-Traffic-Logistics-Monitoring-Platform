const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongo connection failed', error);
    }
};

module.exports = connectMongo;

import mongoose from 'mongoose';

const bestservice =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
});

bestservice.set('timestamps', true);

module.exports = mongoose.models.bestservices || mongoose.model("bestservices", bestservice);
import mongoose from 'mongoose';

const getintouch =  new mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
    propertyID: {
        type: String,
        required: true
    }
});

getintouch.set('timestamps', true);

module.exports = mongoose.models.getintouchs || mongoose.model("getintouchs", getintouch);
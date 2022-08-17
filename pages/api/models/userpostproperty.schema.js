import mongoose from 'mongoose';

const userpostProperty =  new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

userpostProperty.set('timestamps', true);

module.exports = mongoose.models.userpostproperties || mongoose.model("userpostproperties", userpostProperty);
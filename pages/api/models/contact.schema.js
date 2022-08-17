import mongoose from 'mongoose';

const contactSchema =  new mongoose.Schema({
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
    dateOfBirth: {
        type: String,
        required: true
    },
    messages: {
        type: String,
        required: true
    }
});

contactSchema.set('timestamps', true);

module.exports = mongoose.models.contacts || mongoose.model("contacts", contactSchema);
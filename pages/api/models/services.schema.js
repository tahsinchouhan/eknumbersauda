import mongoose from 'mongoose';

const services =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/ddf7je8jj/image/upload/v1655797536/pr39lxgshmxftcqwwbkd.png'
    }
});

services.set('timestamps', true);

module.exports = mongoose.models.services || mongoose.model("services", services);
import mongoose from 'mongoose';

const testimonial =  new mongoose.Schema({
    star: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    }
});

testimonial.set('timestamps', true);

module.exports = mongoose.models.paridhitestimonials || mongoose.model("paridhitestimonials", testimonial);
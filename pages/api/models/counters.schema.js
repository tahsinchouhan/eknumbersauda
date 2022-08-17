import mongoose from 'mongoose';

const counters =  new mongoose.Schema({
    countNumber: {
        type: String,
        required: true
    },
    countTitle: {
        type: String,
        required: true
    }
});

counters.set('timestamps', true);

module.exports = mongoose.models.counters || mongoose.model("counters", counters);
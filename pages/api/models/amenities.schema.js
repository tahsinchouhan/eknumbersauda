import mongoose from 'mongoose';

const amenitiesType =  new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

amenitiesType.set('timestamps', true);

module.exports = mongoose.models.typesamenities || mongoose.model("typesamenities", amenitiesType);
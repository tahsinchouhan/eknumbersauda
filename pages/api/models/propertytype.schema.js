import mongoose from 'mongoose';

const propertyType =  new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
});

propertyType.set('timestamps', true);

module.exports = mongoose.models.propertytypes || mongoose.model("propertytypes", propertyType);
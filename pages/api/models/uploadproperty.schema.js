import mongoose from 'mongoose';

// const ownerdetails = mongoose.Schema({
//     ownername: {
//         type: String,
//         required: true
//     },
//     owneraddress: {
//         type: String,
//         required: true
//     },
//     ownerphone: {
//         type: String,
//         required: true
//     }
// }, { _id : false })


// MAIN SCHEMA
const uploadProperty =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    realprice: {
        type: Number,
        required: true
    },
    offerprice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    propertyname: {
        type: String,
        required: true
    },
    amenities: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    ownerdetails: {
        type: Object,
        required: true
    },
    property: {
        type: String,
        required: true
    },
    whychoose: {
        type: Array,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

uploadProperty.set('timestamps', true);

module.exports = mongoose.models.paridhiproperty || mongoose.model("paridhiproperty", uploadProperty);
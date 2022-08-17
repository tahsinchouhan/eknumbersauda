import mongoose from 'mongoose';

const banner =  new mongoose.Schema({
    bannername: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

banner.set('timestamps', true);

module.exports = mongoose.models.banners || mongoose.model("banners", banner);


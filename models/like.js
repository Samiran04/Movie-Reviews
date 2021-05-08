const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
}, {timestamps: true});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
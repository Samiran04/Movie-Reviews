const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    star: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
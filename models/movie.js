const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    year: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
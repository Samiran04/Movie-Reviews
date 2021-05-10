const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const PICTURE_PATH = path.join('/uploads');

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
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    picture: {
        type: String
    },
    genre: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ]
}, {timestamps: true});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', PICTURE_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

movieSchema.statics.uploadPicture = multer({ storage: storage }).single('picture');
movieSchema.statics.picturePath = PICTURE_PATH;

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
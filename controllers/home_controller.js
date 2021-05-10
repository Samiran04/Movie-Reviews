let Movie = require('../models/movie');
let Review = require('../models/review');
let Genre = require('../models/genre');

module.exports.home = async function(req, res){

    let email, movies;

    movies = await Movie.find({});

    let genres = ['Adventure', 'Action', 'Comedy', 'Drama', 'Science Frction', 'Thriller', 'Romance'];

    movies = movies.sort((a, b) => {
        return b.rating - a.rating;
    });

    //await Review.findByIdAndDelete('60942350f29cd228648b6b00');

    if(req.user)
    {
        email = req.user.email;
    }

    return res.render('home', {
        email: email,
        movies: movies,
        genres: genres
    });
}
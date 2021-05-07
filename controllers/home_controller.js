let Movie = require('../models/movie');
let Review = require('../models/review');

module.exports.home = async function(req, res){

    let email, movies;

    movies = await Movie.find({});

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
        movies: movies
    });
}
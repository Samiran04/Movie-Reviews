let Movie = require('../models/movie');

module.exports.home = async function(req, res){

    let email, movies;

    movies = await Movie.find({});

    if(req.user)
    {
        email = req.user.email;
    }

    return res.render('home', {
        email: email,
        movies: movies
    });
}
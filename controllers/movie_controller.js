const Movie = require('../models/movie');
const Genre = require('../models/genre');

module.exports.create = async function(req, res){
    try{
        if(req.user.email != 'samiranroy0407@gmail.com')
        {
            return res.redirect('back');
        }

        let movie = await Movie.findOne({
            name: req.body.name,
            year: req.body.year
        });

        if(movie)
        {
            return res.redirect('back');
        }

        movie = await Movie.create({
            name: req.body.name,
            year: req.body.year,
            reviews: [],
            rating: 0,
            genre: []
        });

        for(let genre of req.body.genres)
        {
            let gen = await Genre.findOneAndUpdate({name: genre}, {
                $push: {movies: movie._id}
            });

            if(gen == null)
            {
                gen = await Genre.findOneAndUpdate({name: req.body.genres}, {
                    $push: {movies: movie._id}
                });

                movie.genre.push(gen._id);
                break;
            }

            movie.genre.push(gen._id);
        }

        movie.save();

        return res.redirect('back');
    }catch(err){
        console.log('*******Error in movie controller create', err);
        return;
    }
}

module.exports.openMovie = async function(req, res){
    try{
        let movie = await Movie.findById(req.query.id).populate({
            path: 'reviews',
            populate: {
                path: 'likes'
            },
            populate: {
                path: 'user'
            }
        });
        let reviews = movie.reviews;

        return res.render('reviews_section', {
            reviews: reviews,
            name: movie.name,
            movie: movie
        });
    }catch(err){
        console.log('*******Error in movie controller open movie', err);
        return;
    }
}

module.exports.update = async function(req, res){
    try{
        if(req.query.email == 'samiranroy0407@gmail.com')
        {
            let movie = await Movie.findById(req.query.movieId);
            Movie.uploadPicture(req, res, function(err){
                if(err){console.log('****Multer error'); return}

                if(req.file)
                {
                    movie.picture = Movie.picturePath + '/' + req.file.filename;
                }

                console.log(movie.picture);

                movie.save();

                return res.redirect('back');
            })
        }
    }catch(err){
        console.log('*********Error in Movie upload', err);
        return;
    }
}

module.exports.filter = async function(req, res){
    try{
        let movies = [];

        for(let genreName of req.body.genres)
        {
            let genre = await Genre.findOne({name: genreName}).populate('movies');

            if(genre == null)
            {
                let genre = await Genre.findOne({name: req.body.genres}).populate('movies');
                movies = genre.movies;
                break;
            }

            movies = movies.concat(genre.movies);
        }

        movies = movies.sort((a, b) => {
            return b.rating - a.rating;
        });

        //console.log(movies);

        return res.render('filter', {
            movies: movies
        });
    }
    catch(err){
        console.log('*********Error in movie filter', err);
        return;
    }
}
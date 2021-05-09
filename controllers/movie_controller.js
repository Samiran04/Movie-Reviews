const Movie = require('../models/movie');

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
            rating: 0
        });

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
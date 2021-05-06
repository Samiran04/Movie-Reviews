const Review = require('../models/review');
const Movie = require('../models/movie');

module.exports.addReview = async function(req, res){
    try{
        let review = await Review.findOne({user: req.user._id, movie: req.query.id});

        if(review || req.body.content == '')
        {
            return res.redirect('back');
        }

        review = await Review.create({
            user: req.user._id,
            content: req.body.content,
            star: req.body.star,
            movie: req.query.id
        });

        let movie = await Movie.findById(req.query.id);

        movie.save();

        movie.reviews.push(review._id);

        movie = await Movie.findById(req.query.id).populate('reviews');

        let total = 0, n = movie.reviews.length;

        for(let review of movie.reviews)
        {
            total += review.star;
        }

        let avg = total/n;

        movie.rating = avg;

        movie.save();

        return res.redirect('back');
    }catch(err){
        console.log('Error in review controller', err);
        return;
    }
}
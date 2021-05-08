const Review = require('../models/review');
const Movie = require('../models/movie');
const Like = require('../models/like');

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

        let movie = await Movie.findByIdAndUpdate(req.query.id, {
            $push: {reviews: review._id}
        });

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

module.exports.destroyReview = async function(req, res){
    try{

        if(req.query.userId != req.user._id)
        {
            return res.redirect('back');
        }

        await Movie.findByIdAndUpdate(req.query.id, {
            $pull: {reviews: req.query.review}
        });

        await Review.findByIdAndDelete(req.query.review);

        await Like.deleteMany({review: req.query.review});

        let movie = await Movie.findById(req.query.id).populate('reviews');

        let sum = 0, n = movie.reviews.length;

        for(let review of movie.reviews)
        {
            sum += review.star;
        }

        if(n == 0)
            movie.rating = 0;
        else
            movie.rating = sum/n;
        
        movie.save();

        return res.redirect('back');

    }catch(err){
        console.log('**********Error in destroy Review', err);
        return;
    }
}

module.exports.likeAction = async function(req, res){
    try{
        let like = await Like.findOne({review: req.query.review, user: req.query.user});
        let review = await Review.findById(req.query.review).populate('likes');

        if(!like)
        {
            like = await Like.create({review: req.query.review, user: req.query.user});
            review.likes.push(like._id);
        }
        else
        {
            review.likes.pull(like._id);
            await Like.findByIdAndDelete(like._id);
        }

        review.save();

        return res.redirect('back');
    }catch(err)
    {
        console.log('**********Error in like function', err);
        return;
    }
}
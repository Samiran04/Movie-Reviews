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

        console.log(currDate);

        movie = await Movie.create({
            name: req.body.name,
            year: req.body.year,
            reviews: [],
            rating: 0
        });

        return res.redirect('back');
    }catch(err){
        console.log('*******Error in movie controller', err);
        return;
    }
}
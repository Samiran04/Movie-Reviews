const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new localStrategy({
    usernameField: 'email'
}, function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err)
        {
            console.log('Error in passport', err);
            return done(err);
        }
        else if(!user || user.password != password)
        {
            return done(null, false);
        }

        return done(null, user);
    })
}));

passport.serializeUser(function(user, done){
    return done(null, user);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err)
        {
            console.log('Error in passport deserializeUser', err);
            return done(err);
        }

        return done(null, id);
    });
});

passport.checkAuthentication = function(req, res, next)
{
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.checkAuthtenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;
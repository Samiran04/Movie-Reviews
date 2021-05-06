const User = require('../models/users');

module.exports.signIn = function(req, res){
    return res.render('signIn');
}

module.exports.signUp = function(req, res){
    return res.render('signUp');
}

module.exports.create = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(user)
        {
            return res.redirect('back');
        }

        user = await User.create({email: req.body.email, name: req.body.name, password: req.body.password});

        return res.redirect('/users/sign-in');

    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}
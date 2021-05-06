const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users_controller');

router.get('/sign-in', users_controller.signIn);
router.get('/sign-up', users_controller.signUp);
router.get('/destroy-session', passport.checkAuthentication, users_controller.destroySession);
router.get('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), users_controller.createSession)
router.post('/create', users_controller.create);

module.exports = router;
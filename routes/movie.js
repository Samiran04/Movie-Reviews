const express = require('express');
const router = express.Router();
const passport = require('passport');

const movie_controller = require('../controllers/movie_controller');

router.post('/create', passport.checkAuthentication, movie_controller.create);

module.exports = router;
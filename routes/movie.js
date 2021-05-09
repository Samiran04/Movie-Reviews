const express = require('express');
const router = express.Router();
const passport = require('passport');

const movie_controller = require('../controllers/movie_controller');

router.post('/create', passport.checkAuthentication, movie_controller.create);
router.post('/upload', passport.checkAuthentication, movie_controller.update);
router.get('/open-movie', movie_controller.openMovie);

module.exports = router;
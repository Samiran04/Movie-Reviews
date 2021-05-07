const express = require('express');
const router = express.Router();
const passport = require('passport');

const review_controller = require('../controllers/review_controller');

router.post('/add', passport.checkAuthentication, review_controller.addReview);
router.get('/destroy', passport.checkAuthentication, review_controller.destroyReview);

module.exports = router;
const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home_controller');

router.get('/', home_controller.home);
router.use('/review', require('./review'));
router.use('/users', require('./users'));
router.use('/movie', require('./movie'));

module.exports = router;
const express = require('express');
const viewsController = require('./../controllers/viewsController');
const bookingController = require('./../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', bookingController.createBookingCheckout, viewsController.getWelcome);

router.get('/hotelsAll', viewsController.getOverview);
router.get('/hotel/:slug',authController.protect,viewsController.getHotel);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);
//Login route

module.exports = router;

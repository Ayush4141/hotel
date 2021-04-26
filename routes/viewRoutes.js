const express = require('express');
const viewsController = require('./../controllers/viewsController');
const bookingController = require('./../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', viewsController.getWelcome);

router.get('/hotelsAll', viewsController.getOverview);
router.get('/hotel/:slug', authController.protect, viewsController.getHotel);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);

router.get('/myHotels', bookingController.createBookingCheckout, authController.protect, viewsController.getMyHotels);

//Login route

module.exports = router;

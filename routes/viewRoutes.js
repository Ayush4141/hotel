const express = require('express');
const viewsController = require('./../controllers/viewsController');
const bookingController = require('./../controllers/bookingController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getWelcome);

router.get('/hotelsIn/:cityId', authController.isLoggedIn, viewsController.getOverview1);
router.get('/hotelsWithin/:latlng', viewsController.gethotelsWithin10km);

router.get('/hotelsAll', viewsController.getOverview);
router.get('/hotel/:slug', authController.isLoggedIn, viewsController.getHotel);
router.get('/signup', viewsController.getSignUpForm);
router.get('/login', viewsController.getLoginForm);
router.get('/my-profile', authController.protect, viewsController.getAccount);

router.get('/myHotels', bookingController.createBookingCheckout, authController.protect, viewsController.getMyHotels);
router.get('/bookHotel/:hotelIdAndDate1', authController.protect, viewsController.bookHotel);

router.get('/writeReview/:slug', authController.protect, viewsController.writeReview);
//Login route

module.exports = router;

const bookingController = require('./../controllers/bookingController');
const express = require('express');

const authController = require('./../controllers/authController');

const router = express.Router();

//router.use(authController.protect);

router.get('/checkout-session/:hotelId', authController.protect, bookingController.getCheckOutSession);

module.exports = router;

const express = require('express');
const hotelController = require('./../controllers/hotelController');
const reviewRouter = require('./../routes/reviewRoutes');
const authController = require('./../controllers/authController');

const Router = express.Router();

Router.route('/addHotel').post(hotelController.createHotel);

Router.use('/:hotelId/reviews', reviewRouter);

Router.use(authController.protect);
Router.route('/').get(hotelController.getAllHotel);

module.exports = Router;

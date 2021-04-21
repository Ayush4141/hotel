const express = require('express');
const hotelController = require('./../controllers/hotelController');

const Router = express.Router();

Router.route('/addHotel').post(hotelController.createHotel);

Router.route('/').get(hotelController.getAllHotel);

module.exports = Router;
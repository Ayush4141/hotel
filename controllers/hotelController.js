const fs = require('fs');
const Hotel = require('./../models/hotelModel');
const factory = require('./handleFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.getAllHotel = factory.getAll(Hotel);

exports.createHotel = factory.createOne(Hotel);


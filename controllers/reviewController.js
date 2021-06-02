const Review = require('./../models/reviewModel');
//const catchAsync = require('./../utils/catchAsync');
const authController = require('./../controllers/authController');
const factory = require('./../controllers/handleFactory');

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
	//Allow nested routes
	if (!req.body.hotel) req.body.hotel = req.params.hotelId;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

//exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

//exports.updateReview = factory.updateOne(Review);

//exports.deleteReview = factory.deleteOne(Review);

const express = require('express');
const Booking = require('./../models/bookingModel');
const User = require('./../models/userModel');
const Hotel = require('./../models/hotelModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Alerts = require('./../public/js/alert');
const factory = require('./handleFactory');
const APIFeatures = require('./../utils/apiFeatures');
// var NodeGeocoder = require('node-geocoder');

exports.gethotelsWithin10km = catchAsync(async (req, res, next) => {
	const { latlng } = req.params;
	const [lat, lng] = latlng.split(',');

	const radius = 10 / 6378.1;

	if (!lat || !lng) {
		next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
	}

	const hotels = await Hotel.find({
		startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
	});
	noOfHotel = hotels.length;

	res.status(200).render('overview1', {
		title: 'All Hotels',
		hotels,
		noOfHotel,
	});

	// res.status(200).render({
	// 	status: 'success',
	// 	results: hotels.length,
	// 	data: {
	// 		data: hotels,
	// 	},
	// });
});

exports.getOverview = catchAsync(async (req, res, next) => {
	//	console.log('Hi');
	//Get Data from tour collection
	const hotels = await Hotel.find();
	// Build template

	// Render that template

	res.status(200).render('overview1', {
		title: 'All Hotels',
		hotels,
	});
});

exports.getOverview1 = catchAsync(async (req, res, next) => {
	//Get Data from tour collection

	// const hotels = await Hotel.find({ city: req.params.cityId });
	//const hotels = await factory.getAll(Hotel);

	let filter = {};
	//if (req.params.hotelId) filter = { hotel: req.params.hotelId };
	if (req.params.cityId) filter = { city: req.params.cityId };

	const features = new APIFeatures(Hotel.find(filter), req.query).filter().sort().limitFields().paginate();
	const hotels = await features.query;

	//	const hotels = factory.getAll(Hotel);
	// Build template
	// Render that template
	//console.log(hotels)
	noOfHotel = hotels.length;

	res.status(200).render('overview1', {
		title: 'All Hotels in this city',
		hotels,
		noOfHotel,
	});
});

exports.getWelcome = catchAsync(async (req, res, next) => {
	//Get Data from tour collection
	//	const hotels = await Hotel.find();
	// Build template
	var arr = ['Lucknow', 'Delhi', 'Kanpur', 'Jaipur', 'Mumbai', 'Pune', 'Chennai', 'Bangalore'];

	// Render that template

	res.status(200).render('welcome', {
		title: 'All Hotels',
		arr,
		// hotels,
	});
});

exports.getHotel = catchAsync(async (req, res, next) => {
	// Get data for the requested tour
	const hotel = await Hotel.findOne({ slug: req.params.slug }).populate({
		path: 'reviews',
		fields: 'review rating user',
	});
	if (!hotel) {
		return next(new AppError('There is no hotel with that name', 404));
	}

	//3 Render template
	res.status(200).render('hotel', {
		title: `${hotel.name} Hotel`,
		hotel,
	});
});

exports.getSignUpForm = (req, res) => {
	res.status(200).render('signup', {
		title: 'log into your account',
	});
};

exports.getLoginForm = (req, res) => {
	res.status(200).render('login1', {
		title: 'log into your account',
	});
};

exports.getMyHotels = catchAsync(async (req, res, next) => {
	// 1) Find all bookings
	//	console.log('Hello from get my Hotels1');
	const hotels1 = await Booking.find({ user: req.user.id });
	const hotels = hotels1.reverse();
	//console.log(hotels);
	//console.log(`${hotels[12].hotel.name}`);

	// 2) Find tours with the returned IDs
	// const hotelIDs = bookings.map((el) => el.hotel);
	// const hotels = await Hotel.find({ _id: { $in: hotelIDs } });
	//	console.log('Hello from get my hotels2');
	res.status(200).render('myBookedHotels', {
		title: 'My Hotels',
		hotels,
	});
});

exports.getAccount = (req, res) => {
	res.status(200).render('account', {
		title: 'Your account',
	});
};

exports.bookHotel = catchAsync(async (req, res, next) => {
	// 1) Find all bookings
	//	console.log('Hello from get my Hotels1');
	const hotelId = req.params.hotelIdAndDate1.split('_')[0];
	const date1 = req.params.hotelIdAndDate1.split('_')[1];

	const noOfBookings = await Booking.find({ hotel: hotelId, date1: date1 });
	const hotel = await Hotel.findOne({ _id: hotelId });
	var available = hotel.rooms - noOfBookings.length;
	//	const z =req.params.hotelId;

	if (available > 0) {
		res.status(200).render('booking', {
			title: 'Book Now',
			hotel,
			available,
			date1,
		});
	} else {
		//Alerts.showAlert('error', 'Rooms already fulled on this dates');
	}

	// res.status(200).render('booking', {
	// 	title: 'Book Now',
	// 	hotel,
	// 	available
	// });
});

exports.writeReview = catchAsync(async (req, res) => {
	const hotel = await Hotel.findOne({ slug: req.params.slug });
	// console.log(hotel);
	res.status(200).render('review', {
		title: 'Your account',
		hotel,
	});
});

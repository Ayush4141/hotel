const express = require('express');
const Booking = require('./../models/bookingModel');
const User = require('./../models/userModel');
const Hotel = require('./../models/hotelModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

exports.getWelcome = catchAsync(async (req, res, next) => {
	// console.log('Hi');
	//Get Data from tour collection
	//	const hotels = await Hotel.find();
	// Build template

	// Render that template

	res.status(200).render('welcome', {
		title: 'All Hotels',
		// hotels,
	});
});

exports.getHotel = catchAsync(async (req, res, next) => {
	// Get data for the requested tour
	const hotel = await Hotel.findOne({ slug: req.params.slug });
	// .populate({
	// 	path: 'reviews',
	// 	fields: 'review rating user',
	// });
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
	console.log('Hello from get my Hotels1');
	const bookings = await Booking.find({ user: req.user.id });

	// 2) Find tours with the returned IDs
	const hotelIDs = bookings.map((el) => el.hotel);
	const hotels = await Hotel.find({ _id: { $in: hotelIDs } });
	console.log('Hello from get my hotels2');
	res.status(200).render('overview1', {
		title: 'My Hotels',
		hotels,
	});
});

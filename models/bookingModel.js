const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	hotel: {
		type: mongoose.Schema.ObjectId,
		ref: 'Hotel',
		required: true,
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},

//	bookingDate: Date,

	// roomType: {
	// 	type: String,
	// 	enum: ['deluxeRooms', 'premiumRooms'],
	// },

	price: {
		type: Number,
		required: true,
	},
	date1: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

bookingSchema.pre(/^save/, function (next) {
	this
		//.populate('user')
		.populate('hotel');
	next();
});

bookingSchema.pre(/^find/, function (next) {
	this
		//.populate('user')
		.populate('hotel');
	next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

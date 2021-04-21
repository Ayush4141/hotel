const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Hotel = require('./../models/hotelModel');
const Booking = require('./../models/bookingModel');
//console.log(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
	//Get current tour
	console.log("Hello");
	const hotel = await Hotel.findById(req.params.hotelId);

	//2Create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${req.protocol}://{req.get('host)}/?hotel=${req.params.hotelId}&user=${req.user.id}&price=${hotel.price}`,
		cancel_url: `${req.protocol}://{req.get('host)}/hotel/${hotel.slug}`,
		customer_email: req.user.email,
		client_reference_id: req.params.hotelId,
		line_items: [
			{
				name: `${hotel.name} Hotel`,
				description: 'tour.summary',
				images: [`https://drive.google.com/file/d/1a5N5xv8uJLGXA2ogfQ_15vUZCPj7Sb1J/view?usp=sharing`],
				amount: hotel.price * 1,
				currency: 'INR',
				quantity: 1,
			},
		],
	});

	//Create session as response
	res.status(200).json({
		status: 'success',
		session,
	});
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
	//This is temporary as unsecure , because anyone can make bookings without paying
	const { hotel, user, price } = req.query;
	if (!hotel && !user && !price) return next();

	await Booking.create({ hotel, user, price });

	res.redirect(req.originalUrl.split('?')[0]);
});

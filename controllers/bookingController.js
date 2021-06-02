const stripe = require('stripe')(
	'sk_test_51Ii1BOSEviyu8hyP8X3AZIaX9R485GGAbLCuU9XtNqKBbCn8y9v8dGAicO3NWhcudigOmX2A8c4lpID7nwnXzH5F00iHMPYh5D'
);
const Hotel = require('./../models/hotelModel');
const Booking = require('./../models/bookingModel');

//console.log(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
	//Get current tour
	console.log('Hello hi from booking Controller');
	const hotelIdAndDate1 = req.params.hotelIdAndDate1;
	const hotelId = hotelIdAndDate1.split('_')[0];
	const date1 = hotelIdAndDate1.split('_')[1];

	console.log(hotelId);
	console.log(date1);

	const hotel = await Hotel.findById(hotelId);
	//const date1 =
	// const a = `localhost:3000/myHotels/?hotel=${req.params.hotelId}&user=${req.user.id}&price=${hotel.price}`;
	// console.log(a);
	// const b = `localhost:3000/hotel/${hotel.slug}`;
	// console.log(b);
	//	console.log(`${req.user.email}`);
	//	console.log(req.params.hotelId);
	//	console.log(`${hotel.name} ${hotel.id} ${req.user.email} ${hotel.price} ` );

	//2Create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `http://localhost:3000/myHotels/?hotel=${hotelId}&user=${req.user.id}&price=${hotel.price}&date1=${date1}`,
		cancel_url: `https://www.google.com/`,

		customer_email: req.user.email,
		client_reference_id: req.params.hotelId,
		line_items: [
			{
				name: `${hotel.name} Hotel`,
				description: `${hotel.name}`,
				images: [`https://drive.google.com/file/d/1a5N5xv8uJLGXA2ogfQ_15vUZCPj7Sb1J/view?usp=sharing`],
				amount: hotel.price * 100,
				currency: 'INR',
				quantity: 1,
			},
		],
		mode: 'payment',
	});
	console.log(session.id);

	//Create session as response
	res.status(200).json({
		status: 'success',
		session,
	});
	//	next();
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
	//This is temporary as unsecure , because anyone can make bookings without paying
	const { hotel, user, price, date1 } = req.query;
	if (!hotel && !user && !price && !date1) return next();

	await Booking.create({ hotel, user, price, date1 });

	res.redirect(req.originalUrl.split('?')[0]);
});

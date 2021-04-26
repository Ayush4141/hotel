const express = require('express');
const stripe = require('stripe')(
	'sk_test_51Ii1BOSEviyu8hyP8X3AZIaX9R485GGAbLCuU9XtNqKBbCn8y9v8dGAicO3NWhcudigOmX2A8c4lpID7nwnXzH5F00iHMPYh5D'
);
const Hotel = require('./../models/hotelModel');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkoutSession/:hotelId', bookingController.getCheckOutSession);

// router.post('/checkoutSession/:hotelId', async (req ,res) =>{
//     	const hotel = await Hotel.findById(req.params.hotelId);
// 		//			console.log(hotel);

// 		// const a = `localhost:3000/myHotels/?hotel=${req.params.hotelId}&user=${req.user.id}&price=${hotel.price}`;
// 		// console.log(a);
// 		// const b = `localhost:3000/hotel/${hotel.slug}`;
// 		// console.log(b);
// 		//	console.log(`${req.user.email}`);

// 		//2Create checkout session
// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ['card'],
// 			success_url: `localhost:3000/myHotels/?hotel=${req.params.hotelId}&user=${req.user.id}&price=${hotel.price}`,
// 			cancel_url: `localhost:3000/hotel/${hotel.slug}`,

// 			customer_email: req.user.email,
// 			client_reference_id: req.params.hotelId,
// 			line_items: [
// 				{
// 					name: `${hotel.name} Hotel`,
// 					description: `${hotel.name}`,
// 					images: [`https://drive.google.com/file/d/1a5N5xv8uJLGXA2ogfQ_15vUZCPj7Sb1J/view?usp=sharing`],
// 					price: hotel.price,
// 					currency: 'INR',
// 					quantity: 1,
// 				},
// 			],
// 			mode: 'payment',
// 		});

//     res.status(200).json({
//         status: 'success',
//         session,
//     });
// });

module.exports = router;

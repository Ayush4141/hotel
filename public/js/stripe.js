const stripe = Stripe(
	'pk_test_51Ii1BOSEviyu8hyPnFhLhNK9rpY5beMmM8ihIiAhGUCyvRYWSZCuAmuV0QKmhYPNkU0T0ddde0W4t3eEEa9pRE6X00wA40FwHY'
);

const bookHotel = async (hotelId) => {
	try {
		console.log(`Hello`);

		const session = await axios({
			method: 'GET',
			url: `http://127.0.0.1:3000/api/bookings/checkoutSession/${hotelId}`,
			data: {},
		});

		console.log('Hi from bookHotel func after axios call');
		console.log(session);

		// const session = await axios({ method: 'GET', url: `http://127.0.0.1:3000/api/bookings/checkoutSession/${hotelId}`,});
		// console.log(session);
		//Create checkout form + charge credit card
		await stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});
	} catch (err) {
		console.log(err);
	}
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
	bookBtn.addEventListener('click', (e) => {
		e.target.textContent = 'Processing... ';
		const { hotelId } = e.target.dataset;
		//    console.log(hotelId);
		bookHotel(hotelId);
	});
}

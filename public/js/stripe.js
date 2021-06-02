const stripe = Stripe(
	'pk_test_51Ii1BOSEviyu8hyPnFhLhNK9rpY5beMmM8ihIiAhGUCyvRYWSZCuAmuV0QKmhYPNkU0T0ddde0W4t3eEEa9pRE6X00wA40FwHY'
);

const bookHotel = async (hotelId, abc) => {
	try {
		const hotelIdAndDate1 = `${hotelId}_${abc}`;
		//console.log(`${hotelIdAndDate1}`);

		const session = await axios.get(`/api/bookings/checkoutSession/${hotelIdAndDate1}`);

		// const res = await axios.get(`https://reqres.in/api/users`);
		// console.log(res);

		// console.log(`http://127.0.0.1:3000/api/bookings/checkoutSession/${hotelId}`);
		// http://127.0.0.1:3000/api/bookings/checkoutSession/607edcb20737817dccaa787d
		// http://127.0.0.1:3000/api/bookings/checkoutSession/607edcb20737817dccaa787d


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
		//		const hotelId = e.target.dataset.hotelId;
		const { abc } = e.target.dataset;
		// console.log(hotelId);
		// console.log(abc);
		bookHotel(hotelId, abc);
	});
}

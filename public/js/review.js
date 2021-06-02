const createReview = async (review, rating, hotelId) => {
	// console.log(JSON.parse(email, password));
	try {
		const res = await axios({
			method: 'POST',
			url: `http://localhost:3000/api/hotels/${hotelId}/reviews`,
			data: {
				review,
				rating,
			},
		});
		console.log(res.data);
		if (res.data.status === 'success') {
			//showAlert('success', 'Logged in successfully!');
			window.setTimeout(() => {
				location.assign('/');
			}, 1000);
		}
	} catch (err) {
		console.log(err.response.message);
	}
};

////////////////////
const reviewForm = document.querySelector('.review-form');

if (reviewForm) {
	reviewForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('HERE');
        // const  hotelId = req.params.hotelId;
		const comment = document.getElementById('comment').value;
		const stars = document.getElementById('stars').value;
        const hotelId = document.getElementById('hotelId').value;
		console.log(comment, stars, hotelId);
        createReview(comment, stars, hotelId);
		//login(email, password);
	});
}

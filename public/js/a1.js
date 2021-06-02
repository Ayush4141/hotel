const signup = async (city) => {
	// console.log(JSON.parse(email, password));
	location.replace(`/hotelsIn/${city}`);
	// try {
	// 	await axios.get(`http://localhost:3000/hotelsIn/${city}`);
	// 	//		console.log(res.data);
	// } catch (err) {
	// 	console.log(err.response.message);
	// }
};

const signForm = document.querySelector('.search-form');


if (signForm) {
	signForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const city = document.getElementById('city').value;
		// const email = document.getElementById('email').value;
		// const password = document.getElementById('password').value;
		// const passwordConfirm = document.getElementById('passwordConfirm').value;

		//		sendData(name, email, password, passwordConfirm);
		signup(city);
	});
}

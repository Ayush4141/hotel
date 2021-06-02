const signup = async (city) => {
	// console.log(JSON.parse(email, password));
	location.replace(`http://127.0.0.1:3000/hotelsIn/${city}`);
	// try {
	// 	await axios.get(`http://localhost:3000/hotelsIn/${city}`);
	// 	//		console.log(res.data);
	// } catch (err) {
	// 	console.log(err.response.message);
	// }
};

const signForm = document.querySelector('.search-form');

//console.log(signForm);

if (signForm) {
	signForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('HERE');
		const city = document.getElementById('city').value;
		// const email = document.getElementById('email').value;
		// const password = document.getElementById('password').value;
		// const passwordConfirm = document.getElementById('passwordConfirm').value;
		// console.log(name, email, password, passwordConfirm);

		//		sendData(name, email, password, passwordConfirm);
		signup(city);
	});
}

console.log('HELLO FROM FRONT END..');

//const axios = require('axios');
// import '@babel/polyfill';
// import { signup } from './signup';
// const { signup } = require('./signup');
//DOM ELEMENTS

const signup = async (name, email, password, passwordConfirm) => {
	// console.log(JSON.parse(email, password));
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://localhost:3000/api/users/signup',
			data: {
				name,
				email,
				password,
				passwordConfirm,
			},
		});
		console.log(res.data);
	} catch (err) {
		console.log(err.response.message);
	}
};

const signForm = document.querySelector('.signUp-form');
console.log(signForm);

if (signForm) {
	signForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('HERE');
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('passwordConfirm').value;
		console.log(name, email, password, passwordConfirm);

		signup(name, email, password, passwordConfirm);
	});
}

console.log('HELLO FROM FRONT END..');

//const axios = require('axios');
// import '@babel/polyfill';
// import { signup } from './signup';
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

		//		sendData(name, email, password, passwordConfirm);
		signup(name, email, password, passwordConfirm);
	});
}

const login = async (email, password) => {
	// console.log(JSON.parse(email, password));
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://localhost:3000/api/users/login',
			data: {
				email,
				password,
			},
		});
		console.log(res.data);
	} catch (err) {
		console.log(err.response.message);
	}
};

const loginForm = document.querySelector('.login-form');

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('HERE');
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		console.log(email, password);

		login(email, password);
	});
}

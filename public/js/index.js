console.log('HELLO FROM FRONT END..');

//const axios = require('axios');
// import '@babel/polyfill';

//DOM ELEMENTS

const signup = async (name, email, password, passwordConfirm) => {
	// console.log(JSON.parse(email, password));
	try {
		const res = await axios({
			method: 'POST',
			url: '/api/users/signup',
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

//console.log(signForm);

if (signForm) {
	signForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('passwordConfirm').value;

		//		sendData(name, email, password, passwordConfirm);
		signup(name, email, password, passwordConfirm);
	});
}

const login = async (email, password) => {
	try {
		const res = await axios({
			method: 'POST',
			url: '/api/users/login',
			data: {
				email,
				password,
			},
		});
		//console.log(res.data);
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

const loginForm = document.querySelector('.login-form');

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		//console.log(email, password);

		login(email, password);
	});
}

const logout = document.getElementById('log-out');

const logout1 = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: '/api/users/logout',
		});
		if ((res.data.status = 'success')) location.reload(true);
	} catch (err) {
		console.log(err.response);
		//showAlert('error', 'Error logging out! Try again.');
	}
};

if (logout) {
	logout.addEventListener('click', (e) => {
		e.preventDefault();
		logout1();
	});
}

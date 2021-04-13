console.log('HELLO FROM FRONT END..');

//const axios = require('axios');
import '@babel/polyfill';

import { signup } from './signup';
//DOM ELEMENTS

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

		sendData(name, email, password, passwordConfirm);
		signup(name, email, password, passwordConfirm);
	});
}

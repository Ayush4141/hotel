import axios from 'axios';

export const signup = async (name, email, password, passwordConfirm) => {
	// console.log(JSON.parse(email, password));
	try {
		const res = await axios({
			method: 'POST',
			url: 'http://127.0.0.1:3000/api/users/signup',
			data: {
				name,
				email,
				password,
				passwordConfirm,
			},
		});
	} catch (err) {}
};

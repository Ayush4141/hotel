const updateSettings = async (data, type) => {
	try {
		const url =
			type === 'password'
				? '/api/users/updateMyPassword'
				: '/api/users/updateMe';

		const res = await axios({
			method: 'PATCH',
			url,
			data,
		});
        //console.log("Successful");
		if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
			//showAlert('success', `${type.toUpperCase()} updated successfully!`);
		}
	} catch (err) {
		// showAlert('error', err.response.data.message);
	}
};

const userDataForm = document.querySelector('.form-user-data');
if (userDataForm)
	userDataForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append('name', document.getElementById('name').value);
		form.append('email', document.getElementById('email').value);
		form.append('photo', document.getElementById('photo').files[0]);
		//console.log(form);

		updateSettings(form, 'data');
	});



const userPasswordForm = document.querySelector('.form-user-password');

if (userPasswordForm)
	userPasswordForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		document.querySelector('.btn--save-password').textContent = 'Updating...';

		const passwordCurrent = document.getElementById('password-current').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('password-confirm').value;
		await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

		document.querySelector('.btn--save-password').textContent = 'Save password';
		document.getElementById('password-current').value = '';
		document.getElementById('password').value = '';
		document.getElementById('password-confirm').value = '';
	});
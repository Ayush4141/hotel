// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.getSignUpForm = (req, res) => {
	res.status(200).render('signup', {
		title: 'log into your account',
	});
};

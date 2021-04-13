const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
require('dotenv').config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN.toString(),
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	//	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	user.password = undefined;
	//Remove password from output
	res.cookie('jwt', token, cookieOptions);

	return res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		role: req.body.role,
	});
	console.log("HERE")
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const findUser = await User.findOne({ email: req.body.email }).select('+password');
	if (!findUser) return res.status(400).send('Invalid Email');
	const isMatch = await bcryptjs.compare(findUser.password, req.body.password);
	if (!isMatch) createSendToken(findUser, 200, res);
});

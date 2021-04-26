const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
require('dotenv').config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { promisify } = require('util');

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
	console.log('HERE');
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400));
	}
	const findUser = await User.findOne({ email: req.body.email }).select('+password');
	if (!findUser) return res.status(400).send('Invalid Email');
	const isMatch = await bcryptjs.compare(findUser.password, req.body.password);
	if (!isMatch) createSendToken(findUser, 200, res);
});

exports.logout = (req, res) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
//	console.log('Hi from authcontroller.protect');
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
//		console.log('Here is a cookie from authcontroller');
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('You are not logged in ', 401));
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//	console.log('decoded');

	//Check if user exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('User belonging to this token doest not exists', 401));
	}

	// //4 Check if user changed password if JWT is issued
	// if (currentUser.changedPasswordAfter(decoded.iat)) {
	// 	return next(new AppError('Use recently changedPassword , Login Again', 401));
	// }

	//Grant access to protected route
	req.user = currentUser;
	res.locals.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission for this action', 403));
		}
		next();
	};
};

exports.updatePassword = catchAsync(async (req, res, next) => {
	//Get user from collection
	const user = await (await User.findById(req.user.id)).isSelected('+password');

	//Password is correct or not
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError('Your current password is wrong'));
	}

	//If correct , update it
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	//Log In
	createSendToken(user, 200, res);
});

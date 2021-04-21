const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell your name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			//This only works on Save
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords are not the same',
		},
	},
	role: {
		type: String,
		enum: ['user', 'seller' ,'admin'],
		default: 'user',
	},
});

userSchema.pre('save', async function (next) {
	//Only runs if the password is modified
	//	if (!this.isModified('password')) return next();
	//Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);
	//  Delete confirm field
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

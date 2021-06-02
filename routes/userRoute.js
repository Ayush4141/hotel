const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/logout', authController.logout);
Router.patch(
	'/updateMe',
	authController.protect,
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

Router.patch('/updateMyPassword', authController.protect ,authController.updatePassword);
module.exports = Router;

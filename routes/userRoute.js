const express = require('express');

const authController = require('./../controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/logout', authController.logout);

module.exports = Router;

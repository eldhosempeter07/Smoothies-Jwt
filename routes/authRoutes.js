const express = require('express');
const { signup_get, signup_post, login_get, login_post, logout_get } = require('../controller/authController');
const route = express.Router();

route.get('/signup',signup_get);
route.post('/signup',signup_post);
route.get('/login',login_get);
route.post('/login',login_post);
route.get('/logout',logout_get);

module.exports = route;

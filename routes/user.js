const express = require('express');

const router = express.Router();

//controller functions

const {loginUser, signupUser , refreshUser} = require('../controller/userController');


//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//refresh token route
router.post('/refresh', refreshUser);

module.exports = router;
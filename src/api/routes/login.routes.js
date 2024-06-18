const express = require('express');
const router = express.Router();

const loginController = require('../controller/login.controller.js');

router.post('/login', loginController.userLogin);
router.post('/create-user', loginController.createUser);
router.post('/send-otp', loginController.sendOtp);

module.exports = router;
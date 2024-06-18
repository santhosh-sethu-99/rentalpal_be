const loginService = require('../service/login.service.js');

userLogin = async (req, res, next) => {
    let response;

    try {
        const phoneNumber = req.body.phoneNumber;
        const otp = req.body.otp;

        const result = await loginService.userLogin(phoneNumber, otp);

        response = {
            success: true,
            message: 'User successfully loggedin!',
            token: result.jwtToken
        }

        res.status(200).send(response);
    } catch (error) {
        response = {
            success: false,
            error: error.message
        }

        res.status(400).send(response);
    }
    next();
};

createUser = async (req, res, next) => {
    let response;

    try {
        const username = req.body.username;
        const phoneNumber = req.body.phoneNumber;
        const otp = req.body.otp;

        const result = await loginService.createUser(username, phoneNumber, otp);

        response = {
            success: true,
            message: 'User successfully created!',
            token: result.jwtToken
        }

        res.status(200).send(response);
    } catch (error) {
        response = {
            success: false,
            error: error.message
        }

        res.status(400).send(response);
    }
    next();
};

sendOtp = async (req, res, next) => {
    let response;

    try {
        const phoneNumber = req.body.phoneNumber;
        const requestType = req.body.requestType;

        const result = await loginService.sendOtp(phoneNumber, requestType);

        response = {
            success: true,
            message: 'OTP sent!'
        }

        res.status(200).send(response);
    } catch (error) {
        response = {
            success: false,
            error: error.message
        }

        res.status(400).send(response);
    }
    next();
};

module.exports = { userLogin, createUser, sendOtp };


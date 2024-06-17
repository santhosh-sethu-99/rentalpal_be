const loginService = require('../service/login.service.js');

userLogin = (req, res, next) => {
    console.log(`userLogin ${req.method} ${req.url}`);
    let response;
    try {
        const result = loginService.userLogin();

        if (result) {
            response = {
                success: true,
                message: 'User successfully loggedin!'
            }
        } else {
            response = {
                success: false,
                message: 'User not found. Try signing up.'
            }
        }

        res.status(200).send(response);
    } catch (error) {
        response = {
            success: false,
            message: 'Something went wrong!'
        }

        res.status(500).send(response);
    }
    next();
};

createUser = (req, res, next) => {
    console.log(`createUser ${req.method} ${req.url}`);
    let response;

    try {
        const username = req.body.username;
        const phoneNumber = req.body.phoneNumber;
        const otp = req.body.otp;

        const result = loginService.createUser(username, phoneNumber);

        if (result) {
            response = {
                success: true,
                message: 'User successfully created!'
            }
        } else {
            response = {
                success: false,
                message: 'Error while creating user.'
            }
        }

        res.status(200).send(response);
    } catch (error) {
        response = {
            success: false,
            message: 'Something went wrong!'
        }

        res.status(500).send(response);
    }
    next();
};

sendOtp = (req, res, next) => {
    console.log(`sendOtp ${req.method} ${req.url}`);
    next();
};

module.exports = { userLogin, createUser, sendOtp };


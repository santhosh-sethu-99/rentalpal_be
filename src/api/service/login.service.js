const jwt = require('jsonwebtoken');

const loginRepository = require('../repository/login.repository.js');
const userRepository = require('../repository/user.repository.js');
const { LoginFlowTypes } = require('../constants/types.js');


userLogin = async (phoneNumber, otp) => {
    try {
        // check the user with that phone number exists or not 
        const userDetailsCheck = await userRepository.fetchUser(phoneNumber);

        // if user doesn't exist then throw error
        if (userDetailsCheck == null) {
            throw new Error('User with this phone number does not exists. Please signup.');
        }

        // fetching otp details for verification
        const otpDetails = await loginRepository.fetchOtp(phoneNumber, otp)

        // verification of otp
        if (otpDetails != null && otpDetails.isActive == true) {

            // expiring the otp in database
            await loginRepository.updateOtp(phoneNumber, otp);

            // successful verification will generate and return jwt token
            const token = jwt.sign({ phoneNumber }, 'qwerty', { expiresIn: '90d' });

            return { jwtToken: token };
        } else if (otpDetails != null && otpDetails.isActive == false) {
            // throwing error on otp expiration
            throw new Error('OTP expired');
        }

        return null;
    } catch (error) {
        throw error;
    }
};

createUser = async (username, phoneNumber, otp) => {
    try {
        // fetching otp details for verification
        const otpDetails = await loginRepository.fetchOtp(phoneNumber, otp)

        // verification of otp
        if (otpDetails != null && otpDetails.isActive == true) {
            // user creation
            await loginRepository.createUser(username, phoneNumber);

            // expiring the otp in database
            await loginRepository.updateOtp(phoneNumber, otp);

            // successful creation of user will generate and return jwt token
            const token = jwt.sign({ phoneNumber }, 'qwerty', { expiresIn: '1h' });

            return { jwtToken: token };
        } else if (otpDetails != null && otpDetails.isActive == false) {
            // throwing error on otp expiration
            throw Error('OTP expired');
        }

        return null;
    } catch (error) {
        throw Error(error);
    }
};

sendOtp = async (phoneNumber, requestType) => {
    try {

        // if the otp is for create user flow then check if the user is already present 
        // with the same phone number before sending the OTP
        // if so then throwing an error
        if (requestType == LoginFlowTypes.SIGNUP) {
            const userDetails = await userRepository.fetchUser(phoneNumber);

            if (userDetails != null) {
                throw Error('User with this phone number exists. Please login.');
            }
        }

        // 6 digit otp number generation
        const otp = Math.floor(100000 + Math.random() * 900000);

        // adding the otp to the database
        const sendOtpResult = await loginRepository.sendOtp(phoneNumber, otp);

        return sendOtpResult;
    } catch (error) {
        throw error;
    }
};

module.exports = { userLogin, createUser, sendOtp };
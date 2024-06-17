const loginRepository = require('../repository/login.repository.js');

userLogin = () => {
    try {

    } catch (error) {
        throw Error(error);
    }
};

createUser = (username, phoneNumber) => {
    try {
        const userCreationResult = loginRepository.createUser(username, phoneNumber);

        return userCreationResult;
    } catch (error) {
        throw Error(error);
    }
};

sendOtp = () => {
    console.log(`sendOtp ${req.method} ${req.url}`);
};

module.exports = { userLogin, createUser, sendOtp };
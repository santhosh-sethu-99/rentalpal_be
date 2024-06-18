const jwt = require('jsonwebtoken');

authVerification = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, 'qwerty', (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        // If token is valid, save the decoded information to request for use in other routes
        req.user = decoded;
        next();
    });
}

module.exports = { authVerification }
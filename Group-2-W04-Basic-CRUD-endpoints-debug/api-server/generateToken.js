require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const payload = {
    username: 'admin',
    role: 'admin',
};

const options = {
    expiresIn: '1h', 
};

const token = jwt.sign(payload, secretKey, options);

console.log('Generated JWT Token:', token);

const jwt = require('jsonwebtoken')

function generateToken(payload) {
    console.log(process.env.SECRET, '<<<<<<<<<<<<<< ENV');
    return jwt.sign(payload, process.env.SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}
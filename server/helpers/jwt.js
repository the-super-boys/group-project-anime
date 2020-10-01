const jwt = require('jsonwebtoken')

function generateToken(payload) {
    // console.log(process.env.SECRET, '<<<<<<<<<<<<<< ENV');
    return jwt.sign(payload, "thesuperboys")
}

function verifyToken(token) {
    return jwt.verify(token, "thesuperboys")
}

module.exports = {
    generateToken,
    verifyToken
}
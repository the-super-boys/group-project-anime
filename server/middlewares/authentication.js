const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        let { token } = req.headers
        let decoded = verifyToken(token)
        let user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!user) throw {
            name: "AuthenticationFailed"
        }
        req.userData = decoded
        next()
    } catch (err) {
       next(err)
    }
}

module.exports = authentication
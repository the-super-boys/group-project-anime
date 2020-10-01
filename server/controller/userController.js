const {User} = require('.')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class UserController {
    static login(req, res, next) {
        const {
            email,
            password
        } = req.body
        User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if (!user) throw {
                    msg: "invalid email or password",
                    statusCode: 400
                };
                let comparePassword = comparePass(password, user.password)
                if (!comparePassword) throw {
                    msg: "invalid email or password",
                    statusCode: 400
                };
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({
                    token
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController
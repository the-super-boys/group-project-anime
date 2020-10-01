const {User} = require('../models/index')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class UserController {
    static register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;
        User.create({first_name, last_name, email, password})
          .then(newUser => {
            res.status(201).json({
              id: newUser.id,
              email: newUser.email })
          })
          .catch(err => {
            next(err)
          })
      }
    
    
    
    
    
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
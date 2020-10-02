const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class UserController {
  static register(req, res, next) {
    const { first_name, last_name, email, password } = req.body;
    if (first_name === undefined ) {
      first_name = "";
    }
    if ( last_name === undefined ) {
      last_name = "";
    }
    if (email === undefined ) {
      email = "";
    }
    if (password === undefined ) {
      password = "";
    }
    User.create({ first_name, last_name, email, password })
      .then(newUser => {
        res.status(201).json({
          id: newUser.id,
          email: newUser.email
        })
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

  static googleSign(req, res, next) {
    let email = null;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.tokenGoogle,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (user) return user
        else {
          User.create({
            email: email,
            password: "h8anime"
          })
        }
      })
      .then(user => {
        let newPayload = {
          email: user.email,
          id: user.id
        }
        let token = generateToken(newPayload)
        res.status(200).json({ token })
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = UserController
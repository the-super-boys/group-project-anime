
const { User } = require("../models/index")


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
}

module.exports = UserController
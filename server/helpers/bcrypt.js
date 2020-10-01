const bcrypt = require("bcryptjs");

function hashPassword (password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePass (password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {hashPassword, comparePass}
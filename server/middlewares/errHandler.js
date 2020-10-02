function errHandler(err, req, res, next) {
  let errors = [];
  let statusCode = 500;

  switch (err.name) {
    case `SequelizeUniqueConstraintError`:
      errors.push("Email already taken")
      statusCode = 400;
      break;
    case `Authorization failed`:
      errors.push("Forbidden access")
      statusCode = 403;
      break;
    case `JsonWebTokenError`:
    case `Authentication failed`:
      errors.push("Failed to authenticate!")
      statusCode = 401;
      break;
    case `SequelizeValidationError`:
      err.errors.map(el => {
        return errors.push(el.message)
      })
      statusCode = 400;
      break;
    default:
      errors.push(err.msg || "Internal server error");
      statusCode = err.statusCode || 500
  }
  res.status(statusCode).json({
    errors: errors
  })
}

module.exports = errHandler
const { validateToken } = require("../services/auth.services.js");


function checkForAuthentication(req, res, next) {
  const token = req.cookies?.token;
  req.user = null;
  if (!token) {
    return next();
  }

  const user = validateToken(token);

  req.user = user;
  next();
}


module.exports = { checkForAuthentication };

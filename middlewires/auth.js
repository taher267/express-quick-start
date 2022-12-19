const { verify } = require('jsonwebtoken');
const error = require('../utils/error');
const authenticated = (req, res, nex) => {
  const { token } = req.cookies;
  if (token && verify(token, process.env.JWT_SECRET)) return nex();
  throw error(`Login in to access this rescource`);
};
const authorized = (req, res, nex) => {
  nex();
};

module.exports = {
  authenticated,
  authorized,
};

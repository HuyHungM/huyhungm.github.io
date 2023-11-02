const config = require("../config.js")

const Auth = (req, res, next) => {
  // const origin = req.get('origin');
  // if (!config.allowedWebsites.includes(origin)) {
  //   return res.status(403).json({ error: 'Forbidden' });
  // } else next();
  next()
};

module.exports = Auth;
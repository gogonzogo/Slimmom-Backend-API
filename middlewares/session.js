require(`dotenv`).config();
const session = require('express-session');
const sess = {
  secret: process.env.JWT_SECRET,
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
  resave: false,
  saveUninitialized: true,
};

module.exports = {
  session,
  sess,
}
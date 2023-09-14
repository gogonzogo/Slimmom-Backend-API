const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCT,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnathorized: false,
  }
});

const verifyUserEmail = async (email, verificationToken) => {
  try {
    const verifyMessage = {
      from: process.env.EMAIL_ACCT,
      to: email,
      subject: 'Verify your email!',
      text: 'Please use the link below to verify your email address.',
      html: `<p>Click the link below:</p>`
    };
    transporter.sendMail(verifyMessage);
  } catch (error) {
    console.log(error);
  };
};

const emailVerified = async (email) => {
  try {
    const verifiedMessage = {
      from: process.env.EMAIL_ACCT,
      to: email,
      subject: 'Thank you!',
      text: 'Email Verified!.',
      html: `<p>Your email is verified!:</p>`
    };
    transporter.sendMail(verifiedMessage);
  } catch (error) {
    console.log(error);
  };
}

module.exports = {
  verifyUserEmail,
  emailVerified,
};
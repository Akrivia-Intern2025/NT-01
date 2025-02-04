const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { getUserById, updateUserById, deleteUserById, getAllUsers, getUserByEmail, updatePassword } = require('./user.queries');

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
});

const sendResetEmail = async (email, token) => {
  const resetLink = `${FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };

const nodemailer = require('nodemailer');
require('dotenv').config();

const sender = async (emailContent) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'Form Submission',
      text: emailContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error occurred: ', error);
  }
};

module.exports = sender;

const nodemailer = require('nodemailer');
require('dotenv').config();


const sender = async () => {
  try {
    // Create a transporter using Gmail's SMTP server
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail account from .env
        pass: process.env.EMAIL_PASS   // Your Gmail password from .env
      }
    });

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address from .env
      to: process.env.EMAIL_RECEIVER , // List of recipients
      subject: 'Test Email', // Subject of the email
      text: 'Hello from Node.js!' // Plain text body
    };

    // Send the email using async/await
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error occurred: ', error);
  }
};

module.exports = sender;

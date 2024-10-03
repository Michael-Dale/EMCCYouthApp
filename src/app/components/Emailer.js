const nodemailer = require('nodemailer');

const sender = async () => {
  try {
    // Create a transporter using Gmail's SMTP server
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'emccyouthemail@gmail.com', // Your Gmail account
        pass: '********' // Your Gmail password (or app-specific password if 2FA is enabled)
      }
    });

    // Define the email options
    let mailOptions = {
      from: 'emccyouthemail@gmail.com', // Sender's email address
      to: 'mcdale0100@gmail.com', // List of recipients
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

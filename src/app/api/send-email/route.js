import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export async function POST(request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { isAnonymous, firstName, lastName, contactInfo, requestType, message } = body;

    // Create a transporter using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail account from .env
        pass: process.env.EMAIL_PASS,   // Your Gmail password from .env
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: process.env.EMAIL_RECEIVER, // List of recipients
      subject: 'New Form Submission', // Subject of the email
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Form Submission</h2>
          <p style="color: #555;">You have received a new form submission:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;"><strong>First Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ccc;">${isAnonymous ? 'Anonymous' : firstName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;"><strong>Last Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ccc;">${isAnonymous ? '' : lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;"><strong>Contact Info:</strong></td>
              <td style="padding: 10px; border: 1px solid #ccc;">${isAnonymous ? 'N/A' : contactInfo}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;"><strong>Request Type:</strong></td>
              <td style="padding: 10px; border: 1px solid #ccc;">${requestType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;"><strong>Message:</strong></td>
              <td style="padding: 10px; border: 1px solid #ccc;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #777;">This email was generated automatically. Please do not reply.</p>
        </div>
      `, // Styled HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}

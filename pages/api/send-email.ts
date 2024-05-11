// pages/api/send-email.js

import nodemailer from 'nodemailer';

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com', // Replace with your SMTP host
      port: 587, // Replace with your SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'sparkles.sweet14344@gmail.com', // Replace with your email
        pass: process.env.SMTP_PASS || 'nlivrwbfdvfkvcjn', // Replace with your email password
        // tctuvuzuxfnyscju
        // nlivrwbfdvfkvcjn
      },
    });

    // Setup email data
    const mailOptions = {
      from: '"No-Reply" <sparkles.sweet14344@gmail.com', // Replace with your email and name
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
};

export default handler;

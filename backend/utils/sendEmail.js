const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // For development, log email instead of sending
    console.log(`\n📧 Email to ${options.email}:`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}\n`);

    // Uncomment below for real email sending
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `OTT Platform <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    */

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;

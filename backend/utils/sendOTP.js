// Mock OTP sender (replace with Twilio in production)
const sendOTP = async (phone, otp) => {
  try {
    // For development, just log the OTP
    console.log(`\n📱 OTP for ${phone}: ${otp}\n`);
    
    // Uncomment below for real Twilio integration
    /*
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `Your OTT Platform verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */

    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error: error.message };
  }
};

module.exports = sendOTP;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(email, username, verifyUrl) {
  const mailOptions = {
    from: `"Trexo" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Trexo account",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Trexo!</h2>
        <p>Hey <span style="color: #3459d4;"><strong>${username}</strong></span>,</p>
        <p>You are one click away from taking control your finances with us. Lets make it official! Use the button below to verify your email address and complete the registration.</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3459d4; color: #fff; text-decoration: none; border-radius: 5px;">
          Complete Registration
        </a>   
        <p>Can't see the button? <a href="${verifyUrl}" style="text-decoration:none;">Use this link instead.</a></p>
        <br/>
      
        <p>Can't wait to see you soon!</p>
        <p>-Trexo Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendConfirmationEmail(email, username) {
  const mailOptions = {
    from: `"Trexo" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Trexo account has been verified",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
      
        <p>Hey <span style="color: #3459d4;"><strong>${username}</strong></span>,</p>
        <p>Your email has been successfully verified. You're all set to start tracking your finance with Trexo.</p>
        <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 10px 20px; background-color: #3459d4; color: #fff; text-decoration: none; border-radius: 5px;">
          Start Tracking Now
        </a>   
       
        <br/>
      
        <p>Welcome aboard,</p>
        <p>-Trexo Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail: sendVerificationEmail,
  sendConfirmationEmail: sendConfirmationEmail,
};

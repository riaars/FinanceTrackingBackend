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
        <h2 style="color: #3459d4;">Welcome to Trexo!</h2>  
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

async function sendResetPasswordRequestEmail(email, resetUrl) {
  const mailOptions = {
    from: `"Trexo" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
       <h2 style="color: #3459d4;">Reset Your Trexo Password</h2>       
        <p>Hey,</p>
        <p>We have received a request to reset your password. Click the button below to set a new one.</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3459d4; color: #fff; text-decoration: none; border-radius: 5px;">
         Reset Password
        </a>  
        <br/> 
        <p style="color: #666666; font-size: 14px;">
          This link will expire in 15 minutes. If you didn't request a password reset, you can safely ignore this email.
        </p>
        <p style="color: #999999; font-size: 12px; margin-top: 2rem;">
          Need help? Contact us at <a href="mailto:support@trexo.app">support@trexo.superapp</a>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetPasswordSuccessfulEmail(email, username) {
  const mailOptions = {
    from: `"Trexo" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Successful",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">   
        <h2 style="color: #3459d4;">Your password has been updated</h2>  
        <p>Hey ${username},</p>
        <p> We just wanted to let you know that your Trexo password was successfully reset. If this was you — great! You're all set.</p>

        <p style="color: #333333;">
          If you didn’t perform this action, please contact our support team immediately.
        </p>
        <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 10px 20px; background-color: #3459d4; color: #fff; text-decoration: none; border-radius: 5px;">
         Login
        </a>  
        <br/> 
       
        <p style="color: #999999; font-size: 12px; margin-top: 2rem;">
          Need help? Contact us at <a href="mailto:support@trexo.app">support@trexo.superapp</a>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail: sendVerificationEmail,
  sendConfirmationEmail: sendConfirmationEmail,
  sendResetPasswordRequestEmail: sendResetPasswordRequestEmail,
  sendResetPasswordSuccessfulEmail: sendResetPasswordSuccessfulEmail,
};

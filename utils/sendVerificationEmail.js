const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(to, verifyUrl) {
  console.log(to);
  console.log(verifyUrl);
  const mailOptions = {
    from: `"Trexo" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your Trexo account",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Trexo!</h2>
        <p>Click the button below to verify your email and activate your account:</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3459d4; color: #fff; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail: sendVerificationEmail,
};

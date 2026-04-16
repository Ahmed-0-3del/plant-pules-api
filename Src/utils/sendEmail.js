
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.EMAIL_USER , 
    pass: process.env.EMAIL_PASS,     
  },
});

export const sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Plant Pulse" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset OTP",
    html: `
      <h2>Reset Your Password</h2>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing: 8px; color: #4F46E5;">${otp}</h1>
      <p>This code expires in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};



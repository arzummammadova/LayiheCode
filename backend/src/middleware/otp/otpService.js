import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const sendOTPEmail = async (user) => {
  const { email, username } = user;
  const otp = generateOTP();

  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Email Təsdiqləmə Kodunuz",
    html: `
      <h1>Salam, ${username}</h1>
      <p>Sizin birdəfəlik istifadə kodunuz (OTP):</p>
      <h2>${otp}</h2>
    `,
  });

  return otp;
};

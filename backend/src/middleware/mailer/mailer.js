import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const recieveMail = async (user, link) => {
  const { email, username } = user;
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Verification Email",

    html: `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap" rel="stylesheet">
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; background-color: #f0f4f7; padding: 40px; text-align: center; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center;">
          <!-- Logo Section -->
          <h1 style="color:black; font-family: 'Irish Grover', serif; font-size: 36px; margin-bottom: 20px;">
            Read<span style="color: #00DC64;">ly</span>
           
          </h1>
          
          <h2 style="color: #333; font-size: 28px; margin-bottom: 20px;">Salam ${username}</h2>
          <p style="font-size: 16px; color: #555; line-height: 1.5;">Click the link below to verify your account:</p>
          <p style="font-size: 16px; color: #555; line-height: 1.5; margin: 20px 0;">
            (Please don't reply to this email.)
          </p>
          <a href="${link}" style="font-size: 18px; color: white; background-color: #00DC64; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Click here</a>
        </div>
        <footer style="margin-top: 20px; font-size: 12px; color: #777;">
          <p>If you didn't request this, please ignore this email.</p>
        </footer>
      </div>
    </body>
    </html>
    `,
  });
};

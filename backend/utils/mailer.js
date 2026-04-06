import nodemailer from "nodemailer";

export const sendCouponEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Employee Gaming Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Your Redeem Coupon Code",
      text: `Hello! Here is your coupon code: ${code}. Use it to claim your snack reward.`,
      html: `<p>Hello!</p><p>Your coupon code is: <strong>${code}</strong></p><p>Use it to claim your snack reward.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${email}`);
    return true;
  } catch (err) {
    console.error("Mailer error:", err);
    return false;
  }
};

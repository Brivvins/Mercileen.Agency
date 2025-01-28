import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, 
      to: process.env.RECIPIENT_EMAIL as string, 
      subject: `New Message from ${name}`,
      text: message,
      replyTo:  `${email}`
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}

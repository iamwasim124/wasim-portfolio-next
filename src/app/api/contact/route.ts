import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactRequestBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const namePattern = /^[A-Za-z\s]+$/;
const phonePattern = /^[6-9]\d{9}$/;

const formatText = (value: string) => value.replace(/\r?\n/g, "\n").trim();
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const validateBody = (body: ContactRequestBody) => {
  const firstName = body.firstName?.trim() || "";
  const lastName = body.lastName?.trim() || "";
  const phone = body.phone?.trim() || "";
  const email = body.email?.trim() || "";
  const message = body.message?.trim() || "";

  if (
    !firstName ||
    !namePattern.test(firstName) ||
    firstName.length < 2 ||
    firstName.length > 30
  ) {
    return { error: "Invalid first name." };
  }

  if (
    !lastName ||
    !namePattern.test(lastName) ||
    lastName.length < 1 ||
    lastName.length > 30
  ) {
    return { error: "Invalid last name." };
  }

  if (!phone || !phonePattern.test(phone)) {
    return { error: "Invalid phone number." };
  }

  if (!email || !emailPattern.test(email)) {
    return { error: "Invalid email address." };
  }

  if (!message || message.length < 10 || message.length > 500) {
    return { error: "Invalid message length." };
  }

  return {
    data: {
      firstName,
      lastName,
      phone,
      email,
      message,
    },
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const validated = validateBody(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_EMAIL_TO,
      CONTACT_EMAIL_FROM,
    } = process.env;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !CONTACT_EMAIL_TO
    ) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const { firstName, lastName, phone, email, message } = validated.data;
    const safeMessage = formatText(message);
    const fromAddress = CONTACT_EMAIL_FROM || SMTP_USER;
    const fullName = `${firstName} ${lastName}`;

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `Portfolio contact from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(safeMessage).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 500 },
    );
  }
}

"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message" | "budget", string>
>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

type RateEntry = {
  count: number;
  expiresAt: number;
};

const rateBucket = new Map<string, RateEntry>();

const EMAIL_REGEX =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = headerList.get("x-real-ip");
  return realIp ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);

  if (!entry || entry.expiresAt <= now) {
    rateBucket.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function validateFields(values: {
  name: string;
  email: string;
  message: string;
  budget: string;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (values.name.length < 2) {
    errors.name = "Name should be at least 2 characters long.";
  } else if (values.name.length > 80) {
    errors.name = "Please keep the name under 80 characters.";
  }

  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Share a valid email address so I can reply.";
  }

  if (values.message.length < 20) {
    errors.message = "A bit more context helps—use at least 20 characters.";
  } else if (values.message.length > 1000) {
    errors.message = "Please keep the message under 1000 characters.";
  }

  if (values.budget && values.budget.length > 120) {
    errors.budget = "Budget notes should be 120 characters or fewer.";
  }

  return errors;
}

export async function sendContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const spamTrap = formData.get("company");
  if (typeof spamTrap === "string" && spamTrap.trim().length > 0) {
    // Pretend success for bots; silently drop the submission.
    return {
      status: "success",
      message: "Thanks for reaching out!",
    };
  }

  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();
  const budget = (formData.get("budget") ?? "").toString().trim();

  const fieldErrors = validateFields({ name, email, message, budget });
  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      message: "You reached the message limit. Please try again later.",
    };
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.SMTP_TO ?? user;

  if (!host || !user || !pass || !from || !to) {
    console.error("SMTP env vars are missing.");
    return {
      status: "error",
      message: "Messaging is unavailable right now. Please try email instead.",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const textBody = [
    `New contact from ${name}`,
    `Email: ${email}`,
    budget ? `Budget: ${budget}` : null,
    "",
    message,
    "",
    `Client IP: ${ip}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: textBody,
      html: textBody
        .split("\n")
        .map((line) => `<p>${line || "&nbsp;"}</p>`)
        .join(""),
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return {
      status: "error",
      message: "I couldn’t send that right now. Please try again shortly.",
    };
  }

  return {
    status: "success",
    message: "Message delivered — I’ll reply as soon as I can.",
  };
}

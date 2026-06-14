import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (consider using Redis in production)
const requestCounts: Record<string, number[]> = {};
const MAX_REQUESTS_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 10;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

function getRateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }

  requestCounts[ip] = requestCounts[ip].filter(time => time > windowStart);

  if (requestCounts[ip].length >= MAX_REQUESTS_PER_HOUR) {
    const retryAfterSeconds = Math.ceil((requestCounts[ip][0] + WINDOW_MS - now) / 1000);
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: retryAfterSeconds > 0 ? retryAfterSeconds : 1,
    };
  }

  requestCounts[ip].push(now);
  return {
    limited: false,
    remaining: MAX_REQUESTS_PER_HOUR - requestCounts[ip].length,
    retryAfterSeconds: 0,
  };
}

function normalizeIp(rawIp: string | null): string {
  if (!rawIp) return "";
  return rawIp.split(",")[0].trim();
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 5000); // Limit length
}

function sanitizeHeaderValue(value: string, maxLength = 254): string {
  return value
    .replace(/[\r\n]/g, "")
    .trim()
    .slice(0, maxLength);
}

// HTML-escape to prevent injection in emails
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting. In serverless deployments, a shared external store is needed for robust limits.
    const ip = normalizeIp(req.headers.get("x-forwarded-for")) || normalizeIp(req.headers.get("x-real-ip")) || "unknown";
    
    const rateLimit = getRateLimit(ip);
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        }
      );
    }

    const { name, email, message, honeypot } = await req.json();

    // 🚫 SPAM PROTECTION (Honeypot)
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // 🚫 Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const trimmedName = sanitizeInput(name).slice(0, MAX_NAME_LENGTH);
    const trimmedMessage = sanitizeInput(message).slice(0, MAX_MESSAGE_LENGTH);
    const trimmedEmail = String(email).trim();

    if (trimmedName.length === 0 || trimmedMessage.length === 0 || trimmedEmail.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (trimmedMessage.length < MIN_MESSAGE_LENGTH || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message length invalid" }, { status: 400 });
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name too long" }, { status: 400 });
    }

    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Email too long" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || /[\r\n]/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not found in environment");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Sanitize and escape inputs
    const sanitizedName = sanitizeHeaderValue(trimmedName);
    const sanitizedMessage = escapeHtml(trimmedMessage);
    const sanitizedEmail = sanitizeHeaderValue(trimmedEmail);
    const escapedEmailForHtml = escapeHtml(trimmedEmail);

    const response = await resend.emails.send({
      from: "Lucky Digital Tech <onboarding@resend.dev>",
      to: "murithiv23@gmail.com",
      subject: `New Contact Message from ${sanitizedName}`,
      replyTo: sanitizedEmail,
      html: `
        <h3>New Message from ${escapeHtml(sanitizedName)}</h3>
        <p><strong>Email:</strong> ${escapedEmailForHtml}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", response);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
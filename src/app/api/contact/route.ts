import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (consider using Redis in production)
const requestCounts: Record<string, number[]> = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  
  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }
  
  // Remove old requests
  requestCounts[ip] = requestCounts[ip].filter(time => time > oneHourAgo);
  
  // Check if over limit (5 per hour)
  if (requestCounts[ip].length >= 5) {
    return true;
  }
  
  requestCounts[ip].push(now);
  return false;
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 5000); // Limit length
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
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

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Message length invalid" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error(" RESEND_API_KEY not found in environment");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);

    const response = await resend.emails.send({
      from: "Lucky Digital Tech <onboarding@resend.dev>", // Changed from onboarding
      to: "murithiv23@gmail.com",
      subject: `New Contact Message from ${sanitizedName}`,
      reply_to: email,
      html: `
        <h3>New Message from ${sanitizedName}</h3>
        <p><strong>Email:</strong> ${email}</p>
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
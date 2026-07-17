import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

const TO = process.env.CONTACT_TO_EMAIL ?? "info@inesburrell.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "website@inesburrell.com";

// Very small in-memory rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const organisation = (data.organisation ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — contact form submission dropped", { name, email });
    return NextResponse.json({ error: "The form is not available right now. Please email directly." }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Website enquiry <${FROM}>`,
      to: [TO],
      replyTo: email,
      subject: `Website enquiry from ${name}${organisation ? ` (${organisation})` : ""}`,
      text: [`Name: ${name}`, `Email: ${email}`, organisation && `Organisation: ${organisation}`, "", message]
        .filter(Boolean)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed", err);
    return NextResponse.json({ error: "Something went wrong sending your message. Please email directly." }, { status: 500 });
  }
}

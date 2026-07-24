import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    // Send email via Resend
    const data = await resend.emails.send({
      from: "info@heyzain.dev",
      to: "zainali.portfolio@gmail.com",
      replyTo: email,
      subject: `New Message from ${name} (Portfolio)`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; color: #1f2937;">New Portfolio Contact Message</h2>
          <p style="margin-top: 15px;"><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
          <p style="margin-top: 20px; font-weight: bold; color: #4b5563;">Message:</p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; font-size: 14px; color: #374151;">${message}</div>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center;">This message was submitted via the contact form on heyzain.dev.</p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API returned error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 });
  }
}

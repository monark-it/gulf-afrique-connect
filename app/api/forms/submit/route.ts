import { NextRequest, NextResponse } from 'next/server';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, organization, message } = body;
    if (!name?.trim() || !email?.trim() || !organization?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safeOrg     = escapeHtml(organization.trim());
    const safeMessage = escapeHtml(message.trim());

   
    const { error: notifError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RECIPIENT_EMAIL!,
      replyTo: safeEmail,
      subject: type === "client"
        ? `🏢 Nouvelle demande Organisation — ${safeName}`
        : `🔬 Nouvelle candidature Talent — ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #f0f0f0; border-radius: 8px;">
          <div style="border-left: 4px solid #f97316; padding-left: 16px; margin-bottom: 24px;">
            <h2 style="color: #f97316; margin: 0;">
              ${type === "client"
                ? "🏢 Nouvelle Demande Organisation"
                : "🔬 Nouvelle Candidature Talent"}
            </h2>
            <p style="color: #888; margin: 4px 0 0;">ResearchGuide</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #fafafa;">
              <td style="padding: 10px 12px; font-weight: bold; width: 140px; color: #555;">Type</td>
              <td style="padding: 10px 12px;">
                <span style="background: #fff7ed; color: #f97316; padding: 2px 10px; border-radius: 999px; font-size: 13px;">
                  ${type === "client" ? "Organisation / Client" : "Talent / Chercheur"}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #555;">Nom</td>
              <td style="padding: 10px 12px;">${safeName}</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 10px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 10px 12px;">
                <a href="mailto:${safeEmail}" style="color: #f97316;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #555;">
                ${type === "client" ? "Organisation" : "Institution / Labo"}
              </td>
              <td style="padding: 10px 12px;">${safeOrg}</td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 10px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 10px 12px;">${safeMessage}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #555;">Date</td>
              <td style="padding: 10px 12px; color: #888;">${new Date().toLocaleString('fr-FR')}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (notifError) {
      console.error('Notification email error:', notifError);
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
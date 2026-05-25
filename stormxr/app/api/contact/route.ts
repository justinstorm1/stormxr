import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json();

  await resend.emails.send({
    from: 'StormXR Contact <noreply@stormxr.tech>',
    to: ['craigstorm@stormxr.tech', 'justinstorm@stormxr.tech', 'craigstorm1@gmail.com'],
    subject: `[StormXR] ${subject}`,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Submission</title>
        </head>
        <body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 16px;">
            <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

                <!-- Header -->
                <tr>
                    <td style="padding-bottom:32px;" align="center">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                        <td style="vertical-align:middle;">
                            <span style="font-size:20px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">
                                <span>StormXR Contact</span>
                            </span>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>

                <!-- Card -->
                <tr>
                    <td style="background-color:#18181b;border:1px solid #27272a;border-radius:20px;padding:40px;">

                    <!-- Title -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                        <td>
                            <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ff0088;">New Message</p>
                            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Contact Form Submission</h1>
                            <p style="margin:8px 0 0 0;font-size:14px;color:#71717a;">Someone reached out through stormxr.tech</p>
                        </td>
                        </tr>
                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                        <td style="height:1px;background:linear-gradient(to right,#0000ff33,#ff008833);font-size:0;line-height:0;">&nbsp;</td>
                        </tr>
                    </table>

                    <!-- Fields -->
                    <table width="100%" cellpadding="0" cellspacing="0">

                        <!-- Name -->
                        <tr>
                        <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;border:1px solid #27272a;border-radius:12px;padding:16px;">
                            <tr>
                                <td>
                                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#52525b;">Name</p>
                                <p style="margin:0;font-size:15px;color:#ffffff;font-weight:500;">${name}</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>

                        <!-- Email -->
                        <tr>
                        <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;border:1px solid #27272a;border-radius:12px;padding:16px;">
                            <tr>
                                <td>
                                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#52525b;">Email</p>
                                <a href="mailto:${email}" style="margin:0;font-size:15px;color:#0000ff;font-weight:500;text-decoration:none;">${email}</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>

                        ${phone ? `
                        <!-- Phone -->
                        <tr>
                        <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;border:1px solid #27272a;border-radius:12px;padding:16px;">
                            <tr>
                                <td>
                                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#52525b;">Phone</p>
                                <a href="tel:${phone}" style="margin:0;font-size:15px;color:#0000ff;font-weight:500;text-decoration:none;">${phone}</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                        ` : ''}

                        <!-- Subject -->
                        <tr>
                        <td style="padding-bottom:20px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;border:1px solid #27272a;border-radius:12px;padding:16px;">
                            <tr>
                                <td>
                                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#52525b;">Subject</p>
                                <p style="margin:0;font-size:15px;color:#ffffff;font-weight:500;">${subject}</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>

                        <!-- Message -->
                        <tr>
                        <td>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;border:1px solid #27272a;border-radius:12px;padding:16px;">
                            <tr>
                                <td>
                                <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#52525b;">Message</p>
                                <p style="margin:0;font-size:15px;color:#a1a1aa;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>

                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;margin-bottom:28px;">
                        <tr>
                        <td style="height:1px;background:linear-gradient(to right,#0000ff33,#ff008833);font-size:0;line-height:0;">&nbsp;</td>
                        </tr>
                    </table>

                    <!-- Reply CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                        <td align="center">
                            <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;padding:12px 28px;background:linear-gradient(to right,#0000ff,#ff0088);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:100px;letter-spacing:0.01em;">
                            Reply to ${name}
                            </a>
                        </td>
                        </tr>
                    </table>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding-top:28px;" align="center">
                    <p style="margin:0;font-size:12px;color:#3f3f46;">This message was sent via the contact form at <a href="https://stormxr.tech" style="color:#52525b;text-decoration:none;">stormxr.tech</a></p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
    `,
  });

  return NextResponse.json({ ok: true });
}
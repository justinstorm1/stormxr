import { site } from "@/lib/site"

export type ContactEmail = {
  name: string
  email: string
  phone: string
  topic: string
  message: string
}

// Email clients don't support oklch or CSS variables, so these are the hex
// equivalents of the brand tokens in app/globals.css.
const c = {
  bg: "#07080f",
  card: "#11131d",
  inset: "#0b0c15",
  border: "#232634",
  text: "#f4f5fb",
  body: "#c3c6d4",
  muted: "#8a8ea3",
  faint: "#5b5f73",
  blue: "#3d5afe",
  signal: "#7ea6ff",
  violet: "#9b6bff",
  pink: "#f07cc8",
}
const gradient = `linear-gradient(100deg,${c.signal} 0%,${c.violet} 62%,${c.pink} 100%)`
const font =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`)
}

function label(text: string) {
  return `<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${c.faint};">${text}</p>`
}

function detail(title: string, value: string, href?: string) {
  const content = href
    ? `<a href="${href}" style="color:${c.signal};text-decoration:none;font-weight:600;">${value}</a>`
    : `<span style="color:${c.text};font-weight:600;">${value}</span>`
  return `
    <td valign="top" width="49%" class="stack" style="padding:0 0 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${c.inset};border:1px solid ${c.border};border-radius:12px;">
        <tr><td style="padding:14px 16px;font-size:15px;line-height:1.4;word-break:break-word;">
          ${label(title)}${content}
        </td></tr>
      </table>
    </td>`
}

export function contactEmailSubject(data: ContactEmail) {
  return `[StormXR] ${data.topic} — ${data.name}`
}

export function contactEmailText(data: ContactEmail) {
  return [
    `New ${data.topic.toLowerCase()} from ${data.name}`,
    "",
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Topic: ${data.topic}`,
    "",
    data.message,
    "",
    `— Sent via the contact form at ${site.url.replace(/^https?:\/\//, "")}`,
  ].join("\n")
}

export function contactEmailHtml(data: ContactEmail) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const topic = escapeHtml(data.topic)
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br/>")
  const initial = escapeHtml(data.name.trim().charAt(0).toUpperCase() || "?")
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.topic}`)}`
  const telHref = `tel:${data.phone.replace(/[^\d+]/g, "")}`
  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  })
  const siteHost = site.url.replace(/^https?:\/\//, "")
  const preheader = escapeHtml(data.message.slice(0, 140).replace(/\s+/g, " "))

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>New message from ${name}</title>
<style>
  @media (max-width: 600px) {
    .card { padding: 28px 20px !important; }
    .stack { display: block !important; width: 100% !important; box-sizing: border-box; }
    .hero h1 { font-size: 24px !important; }
    .gap { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${c.bg};font-family:${font};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.bg}" style="background-color:${c.bg};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Brand -->
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <a href="${site.url}" style="text-decoration:none;">
              <img src="${site.url}/images/StormXRLogoNoText.png" width="44" height="44" alt="StormXR" style="display:block;margin:0 auto 10px;border:0;" />
              <span style="font-size:13px;font-weight:800;letter-spacing:0.32em;text-transform:uppercase;color:${c.text};">Storm<span style="color:${c.pink};">XR</span></span>
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:${c.card};border:1px solid ${c.border};border-radius:20px;overflow:hidden;">
            <!-- Gradient bar -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td height="4" bgcolor="${c.violet}" style="height:4px;background:${c.violet};background-image:${gradient};font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="card" style="padding:36px 40px 40px;">

                  <!-- Hero -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="hero">
                    <tr>
                      <td>
                        <span style="display:inline-block;padding:5px 12px;border-radius:100px;background-color:#1b1f3a;border:1px solid #2f3870;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${c.signal};">${topic}</span>
                        <h1 style="margin:16px 0 6px;font-size:28px;line-height:1.2;font-weight:800;letter-spacing:-0.02em;color:${c.text};">New message from ${name}</h1>
                        <p style="margin:0;font-size:14px;color:${c.muted};">${sentAt} ET · via ${siteHost}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Sender -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 20px;">
                    <tr>
                      <td width="52" valign="middle">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr><td width="44" height="44" align="center" valign="middle" bgcolor="${c.blue}" style="width:44px;height:44px;border-radius:100px;background:${c.blue};background-image:${gradient};font-size:18px;font-weight:800;color:#ffffff;">${initial}</td></tr>
                        </table>
                      </td>
                      <td valign="middle" style="padding-left:8px;">
                        <p style="margin:0;font-size:16px;font-weight:700;color:${c.text};">${name}</p>
                        <a href="mailto:${email}" style="font-size:14px;color:${c.signal};text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                  </table>

                  <!-- Details -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      ${detail("Email", email, `mailto:${email}`)}
                      <td width="2%" class="gap" style="font-size:0;line-height:0;">&nbsp;</td>
                      ${detail("Phone", phone || "Not provided", phone ? telHref : undefined)}
                    </tr>
                  </table>

                  <!-- Message -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                    <tr>
                      <td style="background-color:${c.inset};border:1px solid ${c.border};border-left:3px solid ${c.violet};border-radius:12px;padding:20px 22px;">
                        ${label("Message")}
                        <p style="margin:6px 0 0;font-size:15px;line-height:1.75;color:${c.body};word-break:break-word;">${message}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="${c.blue}" style="border-radius:100px;background:${c.blue};background-image:linear-gradient(100deg,${c.blue} 0%,${c.violet} 100%);">
                              <a href="${replyHref}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:100px;">Reply to ${name} &rarr;</a>
                            </td>
                          </tr>
                        </table>
                        <p style="margin:12px 0 0;font-size:12px;color:${c.faint};">Or just hit reply — it goes straight to ${email}</p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:28px 16px 0;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:${c.faint};">
              Sent from the contact form at <a href="${site.url}/contact" style="color:${c.muted};text-decoration:underline;">${siteHost}</a><br/>
              Verified with reCAPTCHA
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

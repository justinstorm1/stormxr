// Magic-link sign-in email. Matches the look of the contact email in
// app/contact/email-template.ts. Kept deliverability-friendly: plain text
// version, small HTML, one PNG hosted on our own domain, no tracking links.

const SITE_URL = "https://www.stormxr.tech"
const LOGO_URL = `${SITE_URL}/images/email/nextwavexr-96.png`

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

export const signInEmailSubject = "Your NextWave XR admin sign-in link"

export function signInEmailText(url: string, minutes: number) {
  return [
    "Sign in to NextWave XR Admin",
    "",
    "Open this link to sign in:",
    url,
    "",
    `The link expires in ${minutes} minutes and can only be used once.`,
    "If you didn't request it, you can safely ignore this email.",
    "",
    `— StormXR · ${SITE_URL.replace(/^https?:\/\//, "")}`,
  ].join("\n")
}

export function signInEmailHtml(rawUrl: string, minutes: number) {
  const url = escapeHtml(rawUrl)
  const siteHost = SITE_URL.replace(/^https?:\/\//, "")

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>${signInEmailSubject}</title>
<style>
  @media (max-width: 600px) {
    .card { padding: 28px 20px !important; }
    .hero h1 { font-size: 24px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${c.bg};font-family:${font};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your sign-in link expires in ${minutes} minutes.&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.bg}" style="background-color:${c.bg};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Brand -->
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <img src="${LOGO_URL}" width="48" height="48" alt="NextWave XR" style="display:block;margin:0 auto 10px;border:0;border-radius:12px;" />
            <span style="font-size:13px;font-weight:800;letter-spacing:0.32em;text-transform:uppercase;color:${c.text};">NextWave <span style="color:${c.pink};">XR</span></span>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:${c.card};border:1px solid ${c.border};border-radius:20px;overflow:hidden;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td height="4" bgcolor="${c.violet}" style="height:4px;background:${c.violet};background-image:${gradient};font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="card hero" style="padding:36px 40px 40px;">
                  <span style="display:inline-block;padding:5px 12px;border-radius:100px;background-color:#1b1f3a;border:1px solid #2f3870;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${c.signal};">Admin sign-in</span>
                  <h1 style="margin:16px 0 10px;font-size:28px;line-height:1.2;font-weight:800;letter-spacing:-0.02em;color:${c.text};">Your sign-in link is ready</h1>
                  <p style="margin:0;font-size:15px;line-height:1.7;color:${c.body};">Click the button below to sign in to the NextWave XR admin dashboard.</p>

                  <!-- CTA -->
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                    <tr>
                      <td align="center" bgcolor="${c.blue}" style="border-radius:100px;background:${c.blue};background-image:linear-gradient(100deg,${c.blue} 0%,${c.violet} 100%);">
                        <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:100px;">Sign in to admin &rarr;</a>
                      </td>
                    </tr>
                  </table>

                  <!-- Expiry note -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color:${c.inset};border:1px solid ${c.border};border-left:3px solid ${c.violet};border-radius:12px;padding:16px 18px;font-size:14px;line-height:1.6;color:${c.body};">
                        This link expires in <strong style="color:${c.text};">${minutes} minutes</strong> and can only be used once. If you didn't request it, you can safely ignore this email.
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 6px;font-size:12px;color:${c.faint};">Button not working? Paste this link into your browser:</p>
                  <p style="margin:0;font-size:12px;line-height:1.5;word-break:break-all;"><a href="${url}" style="color:${c.signal};text-decoration:none;">${url}</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:28px 16px 0;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:${c.faint};">
              Sent by StormXR · <a href="${SITE_URL}" style="color:${c.muted};text-decoration:underline;">${siteHost}</a>
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

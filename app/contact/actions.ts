"use server"

import { contactTopics, site } from "@/lib/site"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: Partial<Record<"name" | "email" | "message", string>>
  values?: Record<string, string>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max)
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "company_website", 200)) {
    return { status: "success" }
  }

  const values = {
    name: field(formData, "name", 120),
    email: field(formData, "email", 200),
    phone: field(formData, "phone", 40),
    topic: field(formData, "topic", 40),
    message: field(formData, "message", 5000),
  }

  const errors: ContactState["errors"] = {}
  if (!values.name) errors.name = "Please tell us your name."
  if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address."
  if (values.message.length < 10)
    errors.message = "Please include a little more detail."
  if (Object.keys(errors).length) {
    return { status: "error", errors, values }
  }

  const topicLabel =
    contactTopics.find((t) => t.value === values.topic)?.label ??
    "General inquiry"

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[contact] RESEND_API_KEY not set; message not sent:",
        values
      )
      return { status: "success" }
    }
    return {
      status: "error",
      values,
      message: `Our contact form is temporarily unavailable. Please email us directly at ${site.email}.`,
    }
  }

  const rows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Topic", topicLabel],
  ]
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "StormXR Website <website@stormxr.tech>",
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      reply_to: values.email,
      subject: `[StormXR] ${topicLabel} — ${values.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${values.message}`,
      html: `<table>${rows
        .map(
          ([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`
        )
        .join(
          ""
        )}</table><p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>`,
    }),
  }).catch(() => null)

  if (!res?.ok) {
    return {
      status: "error",
      values,
      message: `Something went wrong sending your message. Please try again or email ${site.email}.`,
    }
  }

  return { status: "success" }
}

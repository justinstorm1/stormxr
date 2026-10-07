"use server"

import { Resend } from "resend"

import { contactTopics, site } from "@/lib/site"

import {
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
} from "./email-template"

const CONTACT_RECIPIENTS = [
  "craigstorm@stormxr.tech",
  "justinstorm@stormxr.tech",
  "craigstorm1@gmail.com",
]

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

async function verifyRecaptcha(token: string) {
  const secret = process.env.CAPTCHA_SECRET_KEY
  if (!secret) {
    console.error("[contact] CAPTCHA_SECRET_KEY not set")
    return false
  }
  if (!token) return false

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  }).catch(() => null)
  if (!res?.ok) return false

  const data = (await res.json()) as { success: boolean }
  return data.success
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

  const recaptchaToken = field(formData, "g-recaptcha-response", 4000)
  if (!(await verifyRecaptcha(recaptchaToken))) {
    return {
      status: "error",
      values,
      message: "Please confirm you're human by completing the reCAPTCHA.",
    }
  }

  const topicLabel =
    contactTopics.find((t) => t.value === values.topic)?.label ??
    "General inquiry"

  if (!process.env.RESEND_API_KEY) {
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

  const emailData = { ...values, topic: topicLabel }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails
    .send({
      from: "StormXR Contact <noreply@stormxr.tech>",
      to: CONTACT_RECIPIENTS,
      replyTo: values.email,
      subject: contactEmailSubject(emailData),
      html: contactEmailHtml(emailData),
      text: contactEmailText(emailData),
    })
    .catch((e: unknown) => ({ error: e }))

  if (error) {
    console.error("[contact] Resend error:", error)
    return {
      status: "error",
      values,
      message: `Something went wrong sending your message. Please try again or email ${site.email}.`,
    }
  }

  return { status: "success" }
}

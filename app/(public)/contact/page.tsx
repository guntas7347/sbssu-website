"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  ShieldAlert,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  role: "student" | "parent" | "faculty" | "visitor" | "vendor";
  department: string;
  subject: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  role: "student",
  department: "General Administration",
  subject: "",
  message: "",
  consent: true,
};

const QUICK_DESKS = [
  {
    title: "General & Administrative Office",
    desc: "Main university enquiries, official correspondence, and campus visits.",
    phone: "01632-242138",
    email: "registrar@sbssu.ac.in",
    icon: Building2,
  },
  {
    title: "Admissions & Academic Cell",
    desc: "B.Tech, M.Tech, BCA, MCA, B.Sc., and academic calendar queries.",
    phone: "01632-242138",
    email: "admissions@sbssu.ac.in",
    icon: GraduationCap,
  },
  {
    title: "Grievance & Student Support",
    desc: "Student grievances, documentation support, and portal assistance.",
    href: "https://grievances.sbssu.ac.in/",
    ctaLabel: "Open Grievance Portal",
    icon: ShieldAlert,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copiedField, setCopiedField] = useState<"address" | "phone" | null>(
    null,
  );

  const addressText =
    "Shaheed Bhagat Singh State University, Moga Road, Firozpur, Punjab 152004";
  const phoneDisplay = "01632-242138";

  const handleCopy = async (value: string, field: "address" | "phone") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  const handleChange = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, subject, and message.");
      return;
    }

    if (!form.consent) {
      setStatus("error");
      setErrorMsg("Please confirm consent so the university office can reply.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || "Unable to submit your message right now.",
        );
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-green-600/10 blur-3xl dark:bg-green-400/10"
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700 uppercase dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-orange-300">
              <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
              Shaheed Bhagat Singh State University
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
              Get in Touch with{" "}
              <span className="text-orange-600 dark:text-orange-400">
                SBSSU Ferozepur
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
              Reach out to the university administration, academic departments,
              or student support desks along Moga Road, Firozpur. Send an
              enquiry below or use direct campus contact details.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Contact Info Cards & Map (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Primary Contact Info Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800">
                <h2 className="text-sm font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                  Contact Info
                </h2>
                <span className="rounded-md bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  Main Campus
                </span>
              </div>

              <div className="mt-5 space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                      Campus Address
                    </p>
                    <p className="mt-1 text-sm leading-relaxed font-medium text-neutral-900 dark:text-neutral-100">
                      SHAHEED BHAGAT SINGH STATE UNIVERSITY,
                      <br />
                      MOGA ROAD, FIROZPUR, PUNJAB 152004
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(addressText, "address")}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-green-700 transition hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                      {copiedField === "address" ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Address copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy address
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-400/10 dark:text-green-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                      Phone
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <a
                        href="tel:01632242138"
                        className="text-base font-semibold text-neutral-900 transition hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
                      >
                        {phoneDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(phoneDisplay, "phone")}
                        className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 transition hover:border-orange-500/40 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-orange-400"
                      >
                        {copiedField === "phone" ? (
                          <>
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                      Working Hours
                    </p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                      Monday – Friday: 9:00 AM – 5:00 PM IST
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Closed on Saturdays, Sundays & Gazetted Holidays
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-400/10 dark:text-green-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                      Official Web & Portals
                    </p>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm">
                      <a
                        href="https://sbssu.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-orange-600 hover:underline dark:text-orange-400"
                      >
                        sbssu.ac.in
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <span className="text-neutral-300 dark:text-neutral-700">
                        •
                      </span>
                      <a
                        href="https://grievances.sbssu.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-green-700 hover:underline dark:text-green-400"
                      >
                        Grievances Portal
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Campus Map */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5 dark:border-neutral-800">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Location Map — Moga Road, Firozpur
                </span>
                <a
                  href="https://maps.google.com/?q=Shaheed+Bhagat+Singh+State+University+Firozpur+152004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  Directions
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="relative h-64 w-full bg-neutral-100 dark:bg-neutral-800">
                <iframe
                  title="Shaheed Bhagat Singh State University Firozpur Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=74.605%2C30.925%2C74.645%2C30.955&layer=mapnik"
                  className="h-full w-full border-0 dark:hue-rotate-180 dark:invert"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="border-b border-neutral-100 pb-5 dark:border-neutral-800">
                <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white">
                  Send an Enquiry
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Have a question about admissions, academics, departments, or
                  general administration? Fill out the form below.
                </p>
              </div>

              {status === "success" && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-50 p-4 text-sm text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold">Enquiry submitted</p>
                    <p className="mt-0.5 text-green-800 dark:text-green-300">
                      Thank you for contacting Shaheed Bhagat Singh State
                      University. Your message has been recorded for review.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-semibold">
                      Please check your submission
                    </p>
                    <p className="mt-0.5 text-red-800 dark:text-red-300">
                      {errorMsg}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Full Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Email Address <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      You Are A
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={(e) =>
                        handleChange(
                          "role",
                          e.target.value as ContactFormState["role"],
                        )
                      }
                      className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent / Guardian</option>
                      <option value="faculty">Faculty / Staff</option>
                      <option value="visitor">Visitor / Alumni</option>
                      <option value="vendor">Vendor / Partner</option>
                    </select>
                  </div>

                  {/* Department / Cell */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Department / Office
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={form.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                    >
                      <option value="General Administration">
                        General Administration
                      </option>
                      <option value="Admissions Cell">Admissions Cell</option>
                      <option value="Computer Science & Engineering">
                        Computer Science & Engineering
                      </option>
                      <option value="Architecture">Architecture</option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Electronics & Communication">
                        Electronics & Communication
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Examination & Results">
                        Examination & Results
                      </option>
                      <option value="Accounts & Finance">
                        Accounts & Finance
                      </option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    Subject <span className="text-orange-600">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Brief summary of your enquiry"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    Message <span className="text-orange-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Write your message, roll number (if applicable), or query details..."
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => handleChange("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 dark:border-neutral-700 dark:bg-neutral-950"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    I agree to share my submitted contact details with Shaheed
                    Bhagat Singh State University for responding to this
                    enquiry.
                  </label>
                </div>

                {/* Submit Row */}
                <div className="flex flex-col items-stretch justify-between gap-4 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center dark:border-neutral-800">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    For urgent campus matters, call{" "}
                    <a
                      href="tel:01632242138"
                      className="font-semibold text-green-700 hover:underline dark:text-green-400"
                    >
                      01632-242138
                    </a>
                    .
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-orange-700 focus:ring-2 focus:ring-orange-500/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-500 dark:text-neutral-950 dark:hover:bg-orange-400"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Desk Cards Below */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {QUICK_DESKS.map((desk) => {
            const Icon = desk.icon;
            return (
              <div
                key={desk.title}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-400/10 dark:text-green-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-900 dark:text-white">
                    {desk.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {desk.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-neutral-100 pt-4 text-xs font-medium dark:border-neutral-800">
                  {"href" in desk && desk.href ? (
                    <a
                      href={desk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      {desk.ctaLabel}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-2 text-neutral-700 dark:text-neutral-300">
                      <a
                        href={`tel:${desk.phone?.replace(/[^0-9]/g, "")}`}
                        className="font-semibold text-green-700 hover:underline dark:text-green-400"
                      >
                        {desk.phone}
                      </a>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {desk.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

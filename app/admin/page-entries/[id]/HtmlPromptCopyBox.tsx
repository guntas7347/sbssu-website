"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

interface HtmlPromptCopyBoxProps {
  pageTitle?: string;
  scopeType?: "university" | "department";
  departmentLabel?: string;
}

export function buildCustomHtmlPrompt({
  pageTitle,
  scopeType = "university",
  departmentLabel,
}: HtmlPromptCopyBoxProps): string {
  const cleanTitle = pageTitle?.trim() || "University Information Page";
  const scopeText =
    scopeType === "department"
      ? `department page for ${departmentLabel?.trim() || "the selected department"}`
      : "university-wide page";

  return [
    `Generate clean, semantic HTML content for a ${scopeText} titled "${cleanTitle}".`,
    "",
    "ask for page details from user to start making page, no need to ask for university details, as they are already included in header and footer. just make html for the topic and exact page",
    "Context & Embedding Rules:",
    "- This HTML will be embedded inside an existing website layout that already provides the site header, navigation, dark/light mode shell, and footer.",
    "- Output ONLY the inner content markup (use <section>, <article>, <h2>, <h3>, <p>, <ul>, <ol>, <table>, etc.). Do NOT include <!DOCTYPE>, <html>, <head>, <body>, or <main> tags.",
    "- Do NOT include <script>, <iframe>, <object>, <embed>, <form>, <style> tags with external imports, or inline event handlers (onclick, onload, onerror, etc.).",
    "- Do NOT use javascript: or data:text/html URLs.",
    "",
    "Color Scheme & Styling Guidelines:",
    "- Primary accent (Orange): light #f97316, dark #fb923c.",
    "- Secondary accent (Green): light #16a34a, dark #4ade80.",
    "- Use Tailwind CSS utility classes with dark: variants so it looks crisp in both light and dark mode (e.g. orange accents for headings/highlights/badges, green accents for secondary badges/links/borders, neutral slate surfaces/text).",
    "- Keep layout responsive, readable, and well-spaced with clean tables and cards where appropriate.",
  ].join("\n");
}

export function HtmlPromptCopyBox({
  pageTitle,
  scopeType = "university",
  departmentLabel,
}: HtmlPromptCopyBoxProps) {
  const [copied, setCopied] = useState(false);

  const promptText = buildCustomHtmlPrompt({
    pageTitle,
    scopeType,
    departmentLabel,
  });

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = promptText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-3.5 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
          Please copy/read prompt for instructions to ai or yourself
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-700 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-green-800 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
}

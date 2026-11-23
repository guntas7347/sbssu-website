import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  Target,
  User,
} from "lucide-react";
import { getPublicCategoryPageData } from "@/lib/actions/public/public-page-categories";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";

const VC_CATEGORY_QUERY = {
  scope: "university",
  catCode: "102", // Update to your VC category code
} as const;

const DEFAULT_VC_PHOTO =
  "https://sbssu.ac.in/BusinessImage/0ecd9ea3-8b99-4889-ac12-4be307aee55a.png";

const DEFAULT_CONTACT_LINES = [
  "vc@sbssu.ac.in",
  "+91 (1632) 244033 (Office)",
  "VC Secretariat, SBSSU Campus, Ferozepur",
];

const DEFAULT_MESSAGE_PARAGRAPHS = [
  "It is my proud privilege to lead Shaheed Bhagat Singh State University (SBSSU), Ferozepur, an institution inspired by the ideals of courage, excellence, and service to society. SBSSU is committed to becoming a preferred destination for professional and multidisciplinary education that is responsive to national priorities, global challenges, and societal needs.",
  "We are dedicated to provide world-class infrastructure, an intellectually vibrant campus, and mentorship from renowned academicians to foster teaching, research, innovation, consultancy, and entrepreneurship. Our curricula are designed in consonance with NEP 2020 and international standards, aligned with industry and civil society, and focused on creative thinking, critical analysis, and strong human and ethical values. In an era marked by rapid technological advancement, automation, and digital transformation, SBSSU places special emphasis on contemporary technical education. We focus on building strong foundations in engineering, science, AI/ML, Data Science, and emerging technologies, complemented by hands-on training, interdisciplinary learning, and problem-solving skills.",
  "Holistic student development lies at the heart of our approach. Through blended learning, corporate mentoring, professional grooming, flexible academic pathways, and a wide range of co-curricular and extra-curricular opportunities, we ensure that our students grow both academically and personally. A transparent, objective, and scientific evaluation system further strengthens the credibility and value of our certifications.",
  "Through strategic collaborations with leading national and international universities and corporates, we promote academic exchange, research excellence, and global exposure. We are dedicated to Institutional Social Responsibility by contributing to rural development, women empowerment, community service, health and environmental sustainability.",
  "Our mission is to nurture not only job-ready graduates but also entrepreneurs, innovators, and responsible leaders who serve the nation and the world with integrity.",
  "I warmly invite students with ambition, vision, and a passion for excellence to join SBSSU and shape a meaningful future.",
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicCategoryPageData(VC_CATEGORY_QUERY);
  const entry = data?.entries?.[0];

  const vcName = entry?.field1?.trim() || "Vice-Chancellor";
  const designation = entry?.field2?.trim() || "Vice-Chancellor";

  return {
    title: `${vcName} | ${designation} — SBSSU, Ferozepur`,
    description:
      entry?.field4?.trim() ||
      `Message and profile of ${vcName}, ${designation}, Shaheed Bhagat Singh State University (SBSSU), Ferozepur.`,
  };
}

function renderContactIcon(line: string) {
  if (line.includes("@")) {
    return (
      <Mail className="h-4 w-4 shrink-0 text-primary dark:text-primary-dark" />
    );
  }
  if (/\+?\d[\d\s()-]{6,}/.test(line)) {
    return (
      <Phone className="h-4 w-4 shrink-0 text-primary dark:text-primary-dark" />
    );
  }
  return (
    <MapPin className="h-4 w-4 shrink-0 text-primary dark:text-primary-dark" />
  );
}

export default async function ViceChancellorPage() {
  const data = await getPublicCategoryPageData(VC_CATEGORY_QUERY);

  if (!data) {
    notFound();
  }

  const { category, entries } = data;
  const entry = entries[0];

  if (!entry) {
    notFound();
  }

  const vcName = entry.field1?.trim() || "Prof. Suresh Kumar Sharma";
  const designation = entry.field2?.trim() || "Vice-Chancellor";
  const messageHeadline =
    entry.field4?.trim() || "Shaping Future Leaders and Innovators";

  const contactLines = entry.field3?.trim()
    ? entry.field3
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : DEFAULT_CONTACT_LINES;

  const messageParagraphs = entry.field5?.trim()
    ? entry.field5
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : DEFAULT_MESSAGE_PARAGRAPHS;

  const safeHtml = entry.htmlContent?.trim()
    ? sanitizeHtmlClient(entry.htmlContent)
    : "";

  const photoUrl = entry.file1?.trim() || DEFAULT_VC_PHOTO;
  const documentUrl = entry.file2?.trim() || null;
  const primaryLink = entry.link1?.trim() || "https://sbssu.ac.in";
  const secondaryLink = entry.link2?.trim() || null;

  const documentLabel =
    category.file2Label?.trim() || "Curriculum Vitae / Document";
  const primaryLinkLabel =
    category.link1Label?.trim() || "Official University Profile";
  const secondaryLinkLabel =
    category.link2Label?.trim() || "Additional Profile";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: VC Profile Card & Contact Info */}
          <div className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Profile Image Banner Background */}
              <div className="relative h-32 bg-gradient-to-r from-primary to-secondary-light">
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Profile Avatar */}
              <div className="relative px-6 pb-6 text-center">
                <div className="mx-auto -mt-16 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-200 text-slate-400 shadow-lg dark:border-slate-900 dark:bg-slate-800">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={vcName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                </div>

                <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
                  {vcName}
                </h1>
                <p className="mt-1 text-xs font-bold tracking-wider text-primary uppercase dark:text-primary-dark">
                  {designation}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Shaheed Bhagat Singh State University
                </p>
                <p className="text-[11px] text-slate-400">
                  Ferozepur, Punjab, India
                </p>

                {/* Quick Contact Details Box (field3) */}
                {contactLines.length > 0 && (
                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-left text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {contactLines.map((line, idx) => (
                      <div
                        key={`vc-contact-${idx}`}
                        className="flex items-start gap-2.5"
                      >
                        {renderContactIcon(line)}
                        <span className="break-words">{line}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Action Links & Files (link1, link2, file2) */}
                {(primaryLink || secondaryLink || documentUrl) && (
                  <div className="mt-6 space-y-2.5 pt-2">
                    {primaryLink && (
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-xl bg-slate-100 py-2.5 text-center text-xs font-semibold text-slate-700 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary-dark"
                      >
                        {primaryLinkLabel}{" "}
                        <ExternalLink className="ml-1 inline h-3.5 w-3.5" />
                      </a>
                    )}

                    {secondaryLink && (
                      <a
                        href={secondaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-dark dark:hover:text-primary-dark"
                      >
                        {secondaryLinkLabel}{" "}
                        <ExternalLink className="ml-1 inline h-3.5 w-3.5" />
                      </a>
                    )}

                    {documentUrl && (
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary-dark/15 dark:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-slate-950"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>{documentLabel}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Message from VC & Leadership Objectives */}
          <div className="space-y-8 lg:col-span-8">
            {/* Message Box */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
              <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" />

              <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase dark:text-primary-dark">
                <Award className="h-4 w-4" />
                <span>
                  {category.name || "Message from the Vice-Chancellor"}
                </span>
              </div>

              <h2 className="mb-6 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                {messageHeadline}
              </h2>

              {safeHtml ? (
                <div
                  className="custom-html-content space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: safeHtml }}
                />
              ) : (
                <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  {messageParagraphs.map((paragraph, idx) => {
                    const isLast = idx === messageParagraphs.length - 1;
                    return (
                      <p
                        key={`vc-msg-${idx}`}
                        className={
                          isLast
                            ? "pt-2 font-semibold text-slate-900 dark:text-white"
                            : undefined
                        }
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Signature block */}
              <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center dark:border-slate-800">
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {vcName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {designation}, SBSSU Ferozepur
                  </p>
                </div>
                <div className="rounded-lg border border-dashed border-slate-300 px-4 py-2 font-serif text-xs italic text-slate-400 dark:border-slate-700">
                  [ Signed Digitally ]
                </div>
              </div>
            </div>

            {/* Strategic Pillars / Focus Areas */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-primary-dark">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Academic Excellence
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                  Upgrading curricula to incorporate cutting-edge domains like
                  Artificial Intelligence, Machine Learning, Robotics, and
                  sustainable green engineering.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-light/10 text-secondary-light dark:text-secondary-dark">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Holistic Development
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                  Encouraging active participation in cultural societies,
                  technical symposiums, NSS community initiatives, and national
                  hackathons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

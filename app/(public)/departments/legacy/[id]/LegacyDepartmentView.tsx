"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Eye,
  Users,
  BookOpen,
  Target,
  FlaskConical,
  Briefcase,
  Award,
  MessageSquare,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { LegacyWebsite } from "@/db/schema";

export interface DeptTabConfig {
  id: string;
  label: string;
  /** Optional single legacy record ID (e.g., for Department & Head, Student Society, Vision & Mission) */
  recordId?: number;
  /** Optional category ID (e.g., for Faculty Profiles, BOS, CO, Labs, Research, Feedback, Time Table, Syllabus) */
  categoryId?: number;
  /** Direct link target if a tab navigates externally/elsewhere instead of showing panel content */
  href?: string;
}

export interface DeptLegacyDataMap {
  recordsById: Record<number, LegacyWebsite>;
  recordsByCategory: Record<number, LegacyWebsite[]>;
}

const DEFAULT_TABS: DeptTabConfig[] = [
  { id: "overview", label: "Department & Head", recordId: 1 },
  { id: "vision", label: "Vision & Mission", recordId: 2 },
  { id: "faculty", label: "Faculty Profiles", categoryId: 10 },
  { id: "bos", label: "Board of Studies", categoryId: 11 },
  { id: "co", label: "Course Outcomes", categoryId: 12 },
  { id: "labs", label: "Laboratories", categoryId: 13 },
  { id: "research", label: "Funded Research", categoryId: 14 },
  { id: "society", label: "Student Society", recordId: 3 },
  { id: "feedback", label: "Student Survey / Feedback Form", categoryId: 15 },
  { id: "timetable", label: "Time Table", categoryId: 16 },
  { id: "syllabus", label: "Syllabus", categoryId: 17 },
];

function resolveAssetUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  return `/data/legacy/${trimmed.replace(/^~?\//, "")}`;
}

function getTabIcon(id: string) {
  switch (id) {
    case "overview":
      return Building2;
    case "vision":
      return Eye;
    case "faculty":
      return Users;
    case "bos":
      return BookOpen;
    case "co":
      return Target;
    case "labs":
      return FlaskConical;
    case "research":
      return Briefcase;
    case "society":
      return Award;
    case "feedback":
      return MessageSquare;
    case "timetable":
      return Calendar;
    case "syllabus":
      return FileText;
    default:
      return Building2;
  }
}

export function LegacyDepartmentView({
  departmentName = "Department of Architecture",
  tabs = DEFAULT_TABS,
  data,
}: {
  departmentName?: string;
  tabs?: DeptTabConfig[];
  data: DeptLegacyDataMap;
}) {
  const initialTab = tabs.find((t) => !t.href)?.id ?? tabs[0]?.id ?? "overview";
  const [activeTabId, setActiveTabId] = useState<string>(initialTab);

  const currentTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  const singleRecord: LegacyWebsite | null = currentTab?.recordId
    ? (data.recordsById[currentTab.recordId] ?? null)
    : null;

  const listRecords: LegacyWebsite[] = currentTab?.categoryId
    ? (data.recordsByCategory[currentTab.categoryId] ?? [])
    : [];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-8">
        {/* Top Context Header */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-secondary dark:bg-secondary-dark/15 dark:text-secondary-dark">
              Legacy Department Bridge
            </span>
            <h1 className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {departmentName}
            </h1>
          </div>

          <span className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary dark:border-primary-dark/25 dark:bg-primary-dark/15 dark:text-primary-dark">
            Temporary Archive View
          </span>
        </div>

        {/* Main Tabbed Panel */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Tab Strip */}
          <div className="border-b border-slate-200 bg-slate-100/80 p-2.5 dark:border-slate-800 dark:bg-slate-900/90">
            <div
              role="tablist"
              aria-label={`${departmentName} sections`}
              className="flex flex-wrap gap-1.5"
            >
              {tabs.map((tab) => {
                const Icon = getTabIcon(tab.id);
                const isActive = tab.id === activeTabId && !tab.href;

                if (tab.href) {
                  const external = tab.href.startsWith("http");
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-dark"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{tab.label}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-sm dark:bg-primary-dark"
                        : "text-slate-700 hover:bg-white hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-dark"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Body */}
          <div className="bg-slate-50/70 p-4 sm:p-6 dark:bg-slate-950/60">
            {currentTab?.id === "overview" && (
              <OverviewPanel record={singleRecord} />
            )}

            {currentTab?.id === "vision" && (
              <RichContentPanel
                title={singleRecord?.name || "Vision & Mission"}
                record={singleRecord}
              />
            )}

            {currentTab?.id === "society" && (
              <RichContentPanel
                title={singleRecord?.name || "Student Society"}
                record={singleRecord}
              />
            )}

            {currentTab?.id === "faculty" && (
              <FacultyListPanel records={listRecords} />
            )}

            {currentTab?.id === "labs" && (
              <LabsTablePanel records={listRecords} />
            )}

            {currentTab?.id &&
              !["overview", "vision", "society", "faculty", "labs"].includes(
                currentTab.id,
              ) && (
                <DocumentsTablePanel
                  title={currentTab.label}
                  records={listRecords}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewPanel({ record }: { record: LegacyWebsite | null }) {
  if (!record) {
    return <EmptyState message="No department & head record found." />;
  }

  const headImage = resolveAssetUrl(record.image);

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-12 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="lg:col-span-8">
        {record.name && (
          <h2 className="mb-4 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
            {record.name}
          </h2>
        )}

        {record.description ? (
          <div
            className="legacy-content prose prose-slate max-w-none overflow-x-auto text-sm leading-relaxed sm:text-base dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: record.description }}
          />
        ) : (
          <p className="text-sm italic text-slate-500 dark:text-slate-400">
            No department overview available.
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-start rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center lg:col-span-4 dark:border-slate-800 dark:bg-slate-800/50">
        {headImage && (
          <img
            src={headImage}
            alt={record.name || "Head of Department"}
            onError={(e) => {
              e.currentTarget.src = "/images/default-user.png";
            }}
            className="mb-4 h-52 w-44 rounded-xl border-4 border-white object-cover shadow-md dark:border-slate-900"
          />
        )}

        {record.company && (
          <p className="text-base font-bold text-slate-900 dark:text-white">
            {record.company}
          </p>
        )}
        {record.address && (
          <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            {record.address}
          </p>
        )}
        {record.email && (
          <a
            href={`mailto:${record.email}`}
            className="mt-2 text-xs font-semibold text-primary hover:underline dark:text-primary-dark"
          >
            {record.email}
          </a>
        )}
      </div>
    </div>
  );
}

function RichContentPanel({
  title,
  record,
}: {
  title: string;
  record: LegacyWebsite | null;
}) {
  if (!record) {
    return <EmptyState message={`No record found for ${title}.`} />;
  }

  const attachmentUrl = resolveAssetUrl(record.image ?? record.webSite);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
          {title}
        </h2>

        {attachmentUrl && (
          <a
            href={attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-95 dark:bg-primary-dark"
          >
            <span>View Attachment</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {record.description ? (
        <div
          className="legacy-content prose prose-slate mt-5 max-w-none overflow-x-auto text-sm leading-relaxed sm:text-base dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: record.description }}
        />
      ) : (
        <p className="mt-4 text-sm italic text-slate-500 dark:text-slate-400">
          No content available.
        </p>
      )}
    </div>
  );
}

function FacultyListPanel({ records }: { records: LegacyWebsite[] }) {
  if (records.length === 0) {
    return <EmptyState message="No faculty profiles found." />;
  }

  return (
    <div className="space-y-4">
      {records.map((item) => {
        const photoUrl = resolveAssetUrl(item.image);
        const profileUrl = resolveAssetUrl(item.advertisement ?? item.webSite);

        return (
          <article
            key={item.id}
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start sm:p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mx-auto shrink-0 sm:mx-0">
              <img
                src={photoUrl || "/images/default-user.png"}
                alt={item.name || "Faculty Member"}
                onError={(e) => {
                  e.currentTarget.src = "/images/default-user.png";
                }}
                className="h-36 w-32 rounded-xl border-2 border-slate-100 object-cover shadow-sm dark:border-slate-800"
              />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              {item.name && (
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h3>
              )}

              {item.description && (
                <div
                  className="legacy-content prose prose-slate max-w-none overflow-x-auto text-sm leading-relaxed dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}

              {profileUrl && (
                <div className="pt-2">
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-95 dark:bg-primary-dark"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function LabsTablePanel({ records }: { records: LegacyWebsite[] }) {
  if (records.length === 0) {
    return <EmptyState message="No laboratory records found." />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80 text-xs font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
              <th className="w-16 px-4 py-3.5">Sr.No</th>
              <th className="px-4 py-3.5">Name</th>
              <th className="px-4 py-3.5">Detail</th>
              <th className="w-44 px-4 py-3.5">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {records.map((item, idx) => {
              const imgUrl = resolveAssetUrl(item.image);
              return (
                <tr
                  key={item.id}
                  className="align-top transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-4 py-4 font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">
                    {item.name || "—"}
                  </td>
                  <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                    {item.description ? (
                      <div
                        className="legacy-content prose prose-slate max-w-none text-xs sm:text-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {imgUrl ? (
                      <a
                        href={imgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={imgUrl}
                          alt={item.name || "Laboratory"}
                          className="h-24 w-36 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                        />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">No image</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentsTablePanel({
  title,
  records,
}: {
  title: string;
  records: LegacyWebsite[];
}) {
  if (records.length === 0) {
    return <EmptyState message={`No records present for ${title}.`} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80 text-xs font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
              <th className="w-16 px-4 py-3.5">Sr.No</th>
              <th className="px-4 py-3.5">Name</th>
              <th className="w-32 px-4 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {records.map((item, idx) => {
              const linkUrl = resolveAssetUrl(item.image ?? item.webSite);
              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-200">
                    {item.name || `Item #${item.id}`}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {linkUrl ? (
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary transition-colors hover:bg-secondary hover:text-white dark:bg-secondary-dark/15 dark:text-secondary-dark dark:hover:bg-secondary-dark dark:hover:text-slate-950"
                      >
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      {message}
    </div>
  );
}

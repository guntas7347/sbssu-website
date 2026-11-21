import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageEntries } from "@/db/schema";

const UPLOAD_DIR = path.resolve(
  /* turbopackIgnore: true */
  process.env.UPLOAD_DIR || path.join(process.cwd(), "data"),
);

const BLOCKED_TAG_RE =
  /<\s*\/?\s*(?:script|iframe|object|embed|link|meta|base|form|noscript|applet|frame|frameset)\b[^>]*>/gi;
const SCRIPT_BLOCK_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_BLOCK_RE = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
const EVENT_HANDLER_RE = /\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const UNSAFE_URI_ATTR_RE =
  /\s+(?:href|src|action|formaction|data)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html)[^"]*"|'\s*(?:javascript|vbscript|data:text\/html)[^']*')/gi;
const DOC_WRAPPER_RE = /<\s*\/?\s*(?:!doctype|html|head|body)\b[^>]*>/gi;

export function sanitizeHtmlServer(rawHtml: string): string {
  if (!rawHtml) return "";

  return rawHtml
    .replace(SCRIPT_BLOCK_RE, "")
    .replace(STYLE_BLOCK_RE, "")
    .replace(BLOCKED_TAG_RE, "")
    .replace(DOC_WRAPPER_RE, "")
    .replace(EVENT_HANDLER_RE, "")
    .replace(UNSAFE_URI_ATTR_RE, "");
}

function resolveSafeDiskPath(
  storedPath: string | null | undefined,
): string | null {
  const trimmed = (storedPath ?? "").trim();
  if (!trimmed) return null;

  // Support both "/data/custom-pages/..." and "custom-pages/..."
  const relative = trimmed.startsWith("/data/")
    ? trimmed.slice("/data/".length)
    : trimmed.replace(/^\/+/, "");

  const resolved = path.resolve(
    /* turbopackIgnore: true */
    UPLOAD_DIR,
    relative,
  );
  const rootWithSep = UPLOAD_DIR.endsWith(path.sep)
    ? UPLOAD_DIR
    : `${UPLOAD_DIR}${path.sep}`;

  if (!resolved.startsWith(rootWithSep)) {
    return null;
  }

  return resolved;
}

export interface LoadedCustomPage {
  id: string;
  title: string | null;
  slug: string;
  scope: "university" | "department";
  departmentId: string | null;
  departmentName: string | null;
  departmentCode: string | null;
  html: string;
}

export async function loadUniversityCustomPage(
  slug: string,
): Promise<LoadedCustomPage | null> {
  const cleanSlug = slug.trim().toLowerCase();
  if (!cleanSlug) return null;

  const [record] = await db
    .select({
      id: pageEntries.id,
      title: pageEntries.title,
      slug: pageEntries.slug,
      htmlPath: pageEntries.htmlPath,
      departmentId: pageEntries.departmentId,
    })
    .from(pageEntries)
    .where(
      and(
        eq(pageEntries.slug, cleanSlug),
        isNotNull(pageEntries.htmlPath),
        isNull(pageEntries.departmentId),
      ),
    )
    .limit(1);

  if (!record || !record.slug) return null;

  const safeDiskPath = resolveSafeDiskPath(record.htmlPath);
  if (!safeDiskPath) return null;

  try {
    const rawHtml = await readFile(
      /* turbopackIgnore: true */
      safeDiskPath,
      "utf-8",
    );
    return {
      id: record.id,
      title: record.title,
      slug: record.slug,
      scope: "university",
      departmentId: null,
      departmentName: null,
      departmentCode: null,
      html: sanitizeHtmlServer(rawHtml),
    };
  } catch {
    return null;
  }
}

export async function loadDepartmentCustomPage(
  deptCode: string,
  slug: string,
): Promise<LoadedCustomPage | null> {
  const cleanCode = deptCode.trim().toLowerCase();
  const cleanSlug = slug.trim().toLowerCase();
  if (!cleanCode || !cleanSlug) return null;

  const [dept] = await db
    .select({
      id: departmentsTable.id,
      name: departmentsTable.name,
      code: departmentsTable.code,
    })
    .from(departmentsTable)
    .where(sql`lower(${departmentsTable.code}) = ${cleanCode}`)
    .limit(1);

  if (!dept) return null;

  const [record] = await db
    .select({
      id: pageEntries.id,
      title: pageEntries.title,
      slug: pageEntries.slug,
      htmlPath: pageEntries.htmlPath,
      departmentId: pageEntries.departmentId,
    })
    .from(pageEntries)
    .where(
      and(
        eq(pageEntries.departmentId, dept.id),
        eq(pageEntries.slug, cleanSlug),
        isNotNull(pageEntries.htmlPath),
      ),
    )
    .limit(1);

  if (!record || !record.slug) return null;

  const safeDiskPath = resolveSafeDiskPath(record.htmlPath);
  if (!safeDiskPath) return null;

  try {
    const rawHtml = await readFile(
      /* turbopackIgnore: true */
      safeDiskPath,
      "utf-8",
    );
    return {
      id: record.id,
      title: record.title,
      slug: record.slug,
      scope: "department",
      departmentId: dept.id,
      departmentName: dept.name,
      departmentCode: dept.code,
      html: sanitizeHtmlServer(rawHtml),
    };
  } catch {
    return null;
  }
}

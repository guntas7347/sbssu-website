"use server";

import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNotNull,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { db } from "@/db/drizzel";
import { placementRecords, type PlacementRecord } from "@/db/schema";

const PLACEMENTS_PAGE_SIZE = 100;

export interface PlacementQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  passingYear?: number;
  branch?: string;
  course?: string;
}

export interface PaginatedPlacementsResult {
  records: PlacementRecord[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: {
    years: number[];
    branches: string[];
    courses: string[];
  };
  stats: {
    totalOffers: number;
    highestPackage: number | null;
    averagePackage: number | null;
    uniqueCompanies: number;
  };
}

export async function getPaginatedPlacements(
  params: PlacementQueryParams = {},
): Promise<PaginatedPlacementsResult> {
  const pageSize = Math.max(1, params.pageSize ?? PLACEMENTS_PAGE_SIZE);
  const requestedPage = Math.max(1, Math.floor(params.page ?? 1));
  const search = params.search?.trim() ?? "";

  const conditions: SQL[] = [];

  if (
    params.passingYear !== undefined &&
    Number.isInteger(params.passingYear)
  ) {
    conditions.push(eq(placementRecords.passingYear, params.passingYear));
  }

  if (params.branch && params.branch.trim() !== "") {
    conditions.push(eq(placementRecords.branch, params.branch.trim()));
  }

  if (params.course && params.course.trim() !== "") {
    conditions.push(eq(placementRecords.course, params.course.trim()));
  }

  if (search !== "") {
    const pattern = `%${search}%`;
    const searchCondition = or(
      ilike(placementRecords.sr, pattern),
      ilike(placementRecords.month, pattern),
      ilike(placementRecords.studentName, pattern),
      ilike(placementRecords.course, pattern),
      ilike(placementRecords.branch, pattern),
      ilike(placementRecords.packageLpa, pattern),
      ilike(placementRecords.jobTitle, pattern),
      ilike(placementRecords.companyName, pattern),
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [
    [{ totalCount }],
    distinctYears,
    distinctBranches,
    distinctCourses,
    packageRows,
    [companyAgg],
  ] = await Promise.all([
    db
      .select({ totalCount: count() })
      .from(placementRecords)
      .where(whereClause),
    db
      .selectDistinct({ passingYear: placementRecords.passingYear })
      .from(placementRecords)
      .where(isNotNull(placementRecords.passingYear))
      .orderBy(desc(placementRecords.passingYear)),
    db
      .selectDistinct({ branch: placementRecords.branch })
      .from(placementRecords)
      .where(isNotNull(placementRecords.branch))
      .orderBy(asc(placementRecords.branch)),
    db
      .selectDistinct({ course: placementRecords.course })
      .from(placementRecords)
      .where(isNotNull(placementRecords.course))
      .orderBy(asc(placementRecords.course)),
    db
      .select({ packageLpa: placementRecords.packageLpa })
      .from(placementRecords)
      .where(whereClause),
    db
      .select({
        uniqueCompanies: sql<number>`count(distinct ${placementRecords.companyName})`,
      })
      .from(placementRecords)
      .where(whereClause),
  ]);

  const parsedPackages = packageRows
    .map((r) => (r.packageLpa ? Number(r.packageLpa.trim()) : NaN))
    .filter((n) => Number.isFinite(n) && n > 0);

  const highestPackage =
    parsedPackages.length > 0 ? Math.max(...parsedPackages) : null;
  const averagePackage =
    parsedPackages.length > 0
      ? Number(
          (
            parsedPackages.reduce((sum, n) => sum + n, 0) /
            parsedPackages.length
          ).toFixed(2),
        )
      : null;

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * pageSize;

  const records = await db
    .select()
    .from(placementRecords)
    .where(whereClause)
    .orderBy(
      desc(placementRecords.passingYear),
      sql`nullif(regexp_replace(coalesce(${placementRecords.sr}, ''), '[^0-9]', '', 'g'), '')::int asc nulls last`,
      asc(placementRecords.studentName),
    )
    .limit(pageSize)
    .offset(offset);

  return {
    records,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    filters: {
      years: distinctYears
        .map((r) => r.passingYear)
        .filter((y): y is number => y !== null && Number.isInteger(y)),
      branches: distinctBranches
        .map((r) => r.branch?.trim())
        .filter((b): b is string => Boolean(b)),
      courses: distinctCourses
        .map((r) => r.course?.trim())
        .filter((c): c is string => Boolean(c)),
    },
    stats: {
      totalOffers: Number(totalCount ?? 0),
      highestPackage,
      averagePackage,
      uniqueCompanies: Number(companyAgg?.uniqueCompanies ?? 0),
    },
  };
}

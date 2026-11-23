import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CategoryPageRenderer } from "@/components/category-views/CategoryPageRenderer";
import { ScopeDirectoryRenderer } from "@/components/category-views/ScopeDirectoryRenderer";
import {
  getPublicCategoryPageData,
  getPublicScopeDirectory,
} from "@/lib/actions/public/public-page-categories";

interface PageProps {
  params: Promise<{
    scope: string;
    slug?: string[];
  }>;
}

const DEPARTMENT_SCOPES = new Set(["department", "all-departments"]);

export async function generateStaticParams() {
  return [];
}

function parseSlugSegments(slug?: string[]): {
  isRootIndex: boolean;
  deptCode: string | null;
  catCode: string | null;
} {
  if (!slug || slug.length === 0) {
    return { isRootIndex: true, deptCode: null, catCode: null };
  }
  if (slug.length === 1) {
    return { isRootIndex: false, deptCode: null, catCode: slug[0] };
  }
  if (slug.length === 2) {
    return { isRootIndex: false, deptCode: slug[0], catCode: slug[1] };
  }
  return { isRootIndex: false, deptCode: null, catCode: null };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { scope, slug } = await params;
  const normalizedScope = scope.trim().toLowerCase();
  const { isRootIndex, deptCode, catCode } = parseSlugSegments(slug);

  if (isRootIndex) {
    const dir = await getPublicScopeDirectory(normalizedScope);
    if (!dir) return { title: "Page Not Found | SBSSU" };

    const label = normalizedScope.toUpperCase();
    return {
      title: `${label} Pages | SBSSU`,
      description: `Browse all ${label} pages and resources at Shaheed Bhagat Singh State University, Ferozepur.`,
    };
  }

  if (!catCode) return { title: "Page Not Found | SBSSU" };

  const data = await getPublicCategoryPageData({
    scope: normalizedScope,
    deptCode,
    catCode,
  });
  if (!data) {
    return { title: "Page Not Found | SBSSU" };
  }

  const deptSuffix = data.department ? ` — ${data.department.name}` : "";
  return {
    title: `${data.category.name}${deptSuffix} | SBSSU`,
    description: `${data.category.name}${deptSuffix} — Shaheed Bhagat Singh State University, Ferozepur`,
  };
}

export default async function ScopedCategoryPage({ params }: PageProps) {
  const { scope, slug } = await params;
  const normalizedScope = scope.trim().toLowerCase();
  const { isRootIndex, deptCode, catCode } = parseSlugSegments(slug);

  if (isRootIndex) {
    if (DEPARTMENT_SCOPES.has(normalizedScope)) redirect("/departments");

    const dir = await getPublicScopeDirectory(normalizedScope);

    if (!dir) notFound();

    return <ScopeDirectoryRenderer data={dir} />;
  }

  if (!catCode) {
    notFound();
  }

  const data = await getPublicCategoryPageData({
    scope: normalizedScope,
    deptCode,
    catCode,
  });
  if (!data) {
    notFound();
  }

  return <CategoryPageRenderer data={data} />;
}

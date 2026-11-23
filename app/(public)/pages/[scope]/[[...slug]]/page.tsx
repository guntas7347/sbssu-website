import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageRenderer } from "@/components/category-views/CategoryPageRenderer";
import { getPublicCategoryPageData } from "@/lib/actions/public/public-page-categories";

interface PageProps {
  params: Promise<{
    scope: string;
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  return [];
}

function parseSlugSegments(slug?: string[]): {
  deptCode: string | null;
  catCode: string | null;
} {
  if (!slug || slug.length === 0 || slug.length > 2) {
    return { deptCode: null, catCode: null };
  }
  if (slug.length === 1) {
    return { deptCode: null, catCode: slug[0] };
  }
  return { deptCode: slug[0], catCode: slug[1] };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { scope, slug } = await params;
  const { deptCode, catCode } = parseSlugSegments(slug);

  if (!catCode) {
    return { title: "Page Not Found | SBSSU" };
  }

  const data = await getPublicCategoryPageData({ scope, deptCode, catCode });
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
  const { deptCode, catCode } = parseSlugSegments(slug);

  if (!catCode) {
    notFound();
  }

  const data = await getPublicCategoryPageData({ scope, deptCode, catCode });
  if (!data) {
    notFound();
  }

  return <CategoryPageRenderer data={data} />;
}

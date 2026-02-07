import UniversalEditor from "@/components/admin/Editor";
import { schemaRegistry } from "@/lib/schema/schema";
import { getAuth } from "@/lib/getAuth";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/actions/getPage";

export default async function Page({
  params,
}: {
  params: { dept: string; pageKey: string };
}) {
  const { dept, pageKey } = await params;

  const user = await getAuth();
  if (!user) notFound();

  const result = await getPage(dept, pageKey, { notfound: false });
  const page = result?.page ?? null;
  const userDept = user.department?.departmentCode;

  // SUPER_ADMIN can access everything
  const isSuperAdmin = user.roles.includes("SUPER_ADMIN");

  // Otherwise must match department
  if (!isSuperAdmin && userDept?.toLowerCase() !== dept.toLowerCase()) {
    notFound();
  }

  const schema = schemaRegistry[pageKey];
  if (!schema) notFound();

  return (
    <UniversalEditor
      dept={dept}
      pageKey={pageKey}
      schema={schema}
      initialData={page}
    />
  );
}

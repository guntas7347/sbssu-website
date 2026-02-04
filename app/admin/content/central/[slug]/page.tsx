import UniversalEditor from "@/components/admin/Editor";
import getData from "@/lib/getData";
import { schemaRegistry } from "@/lib/schema/schema";
import { getAuth } from "@/lib/getAuth";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  const user = await getAuth();
  if (!user) notFound();

  const { payload: page } = await getData(`public/pages/central/${slug}`, {
    notfound: false,
  });

  const schema = schemaRegistry[slug];

  if (!schema) notFound();

  return (
    <UniversalEditor
      dept={null}
      slug={slug}
      schema={schema}
      initialData={page?.data}
    />
  );
}

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    Id?: string;
    mode?: string;
  }>;
};

export default async function LegacyWebsitePage({ searchParams }: Props) {
  const { Id, mode } = await searchParams;

  if (!Id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Legacy Website Preview
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            This is a preview of the old SBSSU website, recreated using the new
            system. Enter an ID to view legacy website content.
          </p>

          <form method="GET" className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="Id"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Legacy Website ID
              </label>

              <input
                id="Id"
                name="Id"
                type="number"
                min="0"
                required
                placeholder="e.g. 1150"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <input type="hidden" name="mode" value={mode ?? "category"} />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-4 py-3 font-medium text-white hover:bg-blue-800"
            >
              View Legacy Content
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            <h2 className="font-semibold">How do I find the ID?</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Open the original SBSSU website or a legacy website link.</li>
              <li>
                Look at the URL for a parameter such as{" "}
                <code className="rounded bg-blue-100 px-1 py-0.5">
                  ?Id=1150
                </code>
                .
              </li>
              <li>
                Enter the number after <code>Id=</code> into the field above.
              </li>
            </ol>
            <p className="mt-3">
              For example, in <code>BSSDetail.aspx?Id=1150</code>, the ID is{" "}
              <strong>1150</strong>.
            </p>
          </div>

          <p className="mt-5 text-xs text-gray-500">
            Note: Depending on the original page, the ID may represent a
            category rather than an individual record.
          </p>
        </div>
      </main>
    );
  }

  if (!/^\d+$/.test(Id)) {
    notFound();
  }

  const id = Number(Id);

  // If the user has already selected a viewing mode
  if (mode === "record") {
    const record = await prisma.legacyWebsite.findUnique({
      where: { id },
    });

    if (!record) notFound();

    return <LegacyLayout record={record} />;
  }

  if (mode === "category") {
    const records = await prisma.legacyWebsite.findMany({
      where: { category: id },
      orderBy: { id: "desc" },
    });

    if (records.length === 0) notFound();

    return <LegacyLayout record={records[0]} categoryRecords={records} />;
  }

  // Search by record ID and category simultaneously
  const [recordById, recordsByCategory] = await Promise.all([
    prisma.legacyWebsite.findUnique({
      where: { id },
    }),
    prisma.legacyWebsite.findMany({
      where: { category: id },
      orderBy: { id: "desc" },
    }),
  ]);

  // Both exist: let the user choose
  if (recordById && recordsByCategory.length > 0) {
    return (
      <LegacyLayout>
        <h2 className="mb-6 text-2xl font-semibold">
          Choose how to view this page
        </h2>

        <div className="flex flex-col gap-4">
          <a
            href={`/legacy-website?Id=${id}&mode=record`}
            className="rounded border p-4 hover:bg-gray-50"
          >
            <strong>View individual record</strong>
            <p>{recordById.name}</p>
          </a>

          <a
            href={`/legacy-website?Id=${id}&mode=category`}
            className="rounded border p-4 hover:bg-gray-50"
          >
            <strong>View category</strong>
            <p>{recordsByCategory.length} records found</p>
          </a>
        </div>
      </LegacyLayout>
    );
  }

  // Only the record ID matches
  if (recordById) {
    return <LegacyLayout record={recordById} />;
  }

  // Only the category matches
  if (recordsByCategory.length > 0) {
    return (
      <LegacyLayout
        record={recordsByCategory[0]}
        categoryRecords={recordsByCategory}
      />
    );
  }

  notFound();
}

function LegacyLayout({
  record,
  categoryRecords,
  children,
}: {
  record?: {
    id: number;
    name: string | null;
    image: string | null;
    description: string | null;
  };
  categoryRecords?: {
    id: number;
    name: string | null;
    image: string | null;
    description: string | null;
  }[];
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <header className="bg-blue-900 px-6 py-5 text-white">
        <h1 className="text-2xl font-bold">SBSSU — Legacy Website Preview</h1>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {children ??
          (categoryRecords ? (
            categoryRecords.map((item) => (
              <section key={item.id} className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">{item.name}</h2>

                {item.image && (
                  <p className="mb-4">
                    <a
                      href={`/data/legacy/${item.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      Open associated image or link
                    </a>
                  </p>
                )}

                {item.description && (
                  <div
                    className="legacy-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                )}
              </section>
            ))
          ) : record ? (
            <>
              <h2 className="mb-6 text-2xl font-semibold">{record.name}</h2>

              {record.image && (
                <p className="mb-4">
                  <a
                    href={`/data/legacy/${record.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Open associated image or link
                  </a>
                </p>
              )}

              {record.description && (
                <div
                  className="legacy-content"
                  dangerouslySetInnerHTML={{
                    __html: record.description,
                  }}
                />
              )}
            </>
          ) : null)}
      </div>

      <footer className="mt-12 bg-gray-100 px-6 py-5 text-center text-sm">
        SBSSU Legacy Website Preview
      </footer>
    </main>
  );
}

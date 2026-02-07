import { Gavel, Download, FileText } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function ByLawsPage() {
  const { page, updatedAt } = await getPage("admin", "university-bylaws");

  const about = page?.about || "N/A";
  const documents = page?.documents || [];
  const keyProvisions = page?.keyProvisions || [];
  const amendmentProcedure = page?.amendmentProcedure || "N/A";

  return (
    <div>
      <PageHeader
        title="By-Laws & Regulations"
        subTitle="Legal framework and rules governing the university"
        icon={Gavel}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About University By-Laws
            </h2>
            <p className="text-gray-600 leading-relaxed">{about}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">
                        {doc?.title || "N/A"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {doc?.size || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {doc?.description || "N/A"}
                  </p>
                  {doc?.file?.url ? (
                    <a
                      href={doc.file.url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold w-full justify-center"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 text-center">
                      Download not available
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No documents found.
              </p>
            )}
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Key Provisions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {keyProvisions.length > 0 ? (
                keyProvisions.map((prov, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-5 border-l-4 border-orange-600"
                  >
                    <h3 className="font-bold text-gray-800 mb-2">
                      {prov?.title || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {prov?.provision || "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No key provisions found.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Amendment Procedure
            </h3>
            <p className="text-gray-600 mb-4">{amendmentProcedure}</p>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}

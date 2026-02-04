import getPage from "@/lib/getPage";
import { FileText, Download, BookOpen, CheckCircle } from "lucide-react";

export default async function AcademicRegulationsPage() {
  const { payload } = await getPage(
    `public/pages/central/academic-regulations`,
  );

  const { regulations, documents } = payload?.data;

  return (
    <div>
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Academic Regulations
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Rules and regulations governing academic programs
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              The academic regulations define the framework for all academic
              programs at SBSSU. These regulations cover admission procedures,
              attendance requirements, examination systems, grading criteria,
              and student conduct. All students are expected to familiarize
              themselves with these regulations and comply with them throughout
              their academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {regulations.map((reg, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {reg.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {reg.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Download Documents
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-orange-600 transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="font-bold text-gray-800">{doc.title}</h3>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {doc.description}
                  </p>
                  <a
                    href={doc.file.url}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-8 border-l-4 border-orange-600">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Important Note
            </h3>
            <p className="text-gray-700">
              All students must read and understand the academic regulations.
              Ignorance of rules will not be accepted as an excuse for
              non-compliance. For any clarification, contact the Dean Academic
              Affairs office.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { FileText, Download, CheckCircle } from "lucide-react";

export default function QuestionTemplatesPage() {
  const templates = [
    {
      category: "Theory Examinations",
      templates: [
        {
          title: "Mid-Semester Theory Paper",
          description:
            "Template for mid-semester theory examinations (3 hours)",
          format: "DOCX",
          size: "45 KB",
          url: "/downloads/mid-semester-theory-template.docx",
        },
        {
          title: "End-Semester Theory Paper",
          description:
            "Template for end-semester theory examinations (3 hours)",
          format: "DOCX",
          size: "48 KB",
          url: "/downloads/end-semester-theory-template.docx",
        },
        {
          title: "Objective Type Question Paper",
          description: "MCQ and objective type question paper template",
          format: "DOCX",
          size: "42 KB",
          url: "/downloads/objective-question-template.docx",
        },
      ],
    },
    {
      category: "Practical Examinations",
      templates: [
        {
          title: "Laboratory Practical Exam",
          description: "Template for laboratory practical examinations",
          format: "DOCX",
          size: "38 KB",
          url: "/downloads/lab-practical-template.docx",
        },
        {
          title: "Viva-Voce Question Set",
          description: "Template for oral examination questions",
          format: "DOCX",
          size: "35 KB",
          url: "/downloads/viva-template.docx",
        },
      ],
    },
    {
      category: "Project & Assignment",
      templates: [
        {
          title: "Project Evaluation Template",
          description: "Template for major project evaluation and assessment",
          format: "DOCX",
          size: "52 KB",
          url: "/downloads/project-evaluation-template.docx",
        },
        {
          title: "Assignment Questions",
          description: "Template for internal assignment questions",
          format: "DOCX",
          size: "40 KB",
          url: "/downloads/assignment-template.docx",
        },
      ],
    },
  ];

  const guidelines = [
    "Use Times New Roman font, size 12 for questions",
    'Maintain proper margins: Left 1.5", Right 1", Top & Bottom 1"',
    "Include university logo and header information",
    "Clearly mention total marks, time duration, and instructions",
    "Number all questions properly and maintain consistency",
    "Proofread thoroughly before final submission",
    "Submit question papers 15 days before examination date",
    "Ensure question paper covers entire syllabus proportionately",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Question Paper Templates
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Download standardized templates for preparing question papers
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Question Paper Templates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All faculty members are required to use these standardized
              templates when preparing question papers for examinations. The
              templates ensure consistency, maintain university standards, and
              include all necessary instructions for students.
            </p>
          </div>

          {templates.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {categoryIndex + 1}
                </div>
                {category.category}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {template.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded font-semibold">
                            {template.format}
                          </span>
                          <span className="text-xs text-gray-500">
                            {template.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.description}
                    </p>
                    <a
                      href={template.url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold w-full justify-center text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download Template
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Question Paper Guidelines
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{guideline}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Submission Process
              </h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Download Template
                    </p>
                    <p className="text-sm text-gray-600">
                      Choose appropriate template for your examination
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Prepare Questions
                    </p>
                    <p className="text-sm text-gray-600">
                      Fill in questions following guidelines and format
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Get Approval</p>
                    <p className="text-sm text-gray-600">
                      Submit to HOD for review and approval
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Final Submission
                    </p>
                    <p className="text-sm text-gray-600">
                      Submit to COE office 15 days before exam
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Contact for Support
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-1">
                    Technical Support
                  </p>
                  <p className="text-sm text-gray-700">
                    For template issues and formatting help
                  </p>
                  <p className="text-sm text-orange-600 mt-2">
                    support.exam@sbssu.ac.in
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-1">COE Office</p>
                  <p className="text-sm text-gray-700">
                    For submission and examination queries
                  </p>
                  <p className="text-sm text-green-600 mt-2">coe@sbssu.ac.in</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-1">
                    Office Hours
                  </p>
                  <p className="text-sm text-gray-700">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
                  <p className="text-sm text-gray-700">
                    Phone: +91-1234-567890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

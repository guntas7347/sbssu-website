"use client";

import { useState, useEffect } from "react";
import { Download, FileText, Search, Calendar, File } from "lucide-react";

interface DownloadItem {
  id: number;
  title: string;
  category: string;
  file_url: string;
  upload_date: string;
  file_size: string;
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("/data/downloads.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setDownloads(data))
      .catch((err) => console.error("Error loading downloads:", err));
  }, []);

  const categories = [
    { value: "all", label: "All Downloads", icon: FileText },
    { value: "forms", label: "Forms", icon: File },
    { value: "notifications", label: "Notifications", icon: FileText },
    { value: "syllabus", label: "Syllabus", icon: FileText },
    { value: "documents", label: "Documents", icon: FileText },
  ];

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      forms: "border-orange-600 bg-orange-50",
      notifications: "border-green-600 bg-green-50",
      syllabus: "border-blue-600 bg-blue-50",
      documents: "border-purple-600 bg-purple-50",
    };
    return colors[category] || "border-gray-600 bg-gray-50";
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      forms: "bg-orange-100 text-orange-700",
      notifications: "bg-green-100 text-green-700",
      syllabus: "bg-blue-100 text-blue-700",
      documents: "bg-purple-100 text-purple-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">Downloads</h1>
          </div>
          <p className="text-lg">
            Access forms, syllabi, notifications, and important documents
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Downloads
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`p-4 rounded-xl transition ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mx-auto mb-2 ${
                      isActive ? "text-white" : "text-orange-600"
                    }`}
                  />
                  <p className="text-sm font-semibold">{cat.label}</p>
                </button>
              );
            })}
          </div>

          {filteredDownloads.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDownloads.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border-l-4 ${getCategoryColor(
                    item.category
                  )}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="w-10 h-10 text-orange-600 flex-shrink-0" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      {item.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(item.upload_date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <File className="w-4 h-4" />
                        <span>{item.file_size}</span>
                      </div>
                    </div>
                    <a
                      href={item.file_url}
                      download
                      className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No downloads found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <FileText className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Forms for Students
              </h3>
              <p className="text-sm text-gray-600">
                Download admission forms, scholarship applications, hostel
                forms, and other student-related documents.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <FileText className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Academic Resources
              </h3>
              <p className="text-sm text-gray-600">
                Access syllabi, academic calendars, examination timetables, and
                course-related materials.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">
                Official Documents
              </h3>
              <p className="text-sm text-gray-600">
                Download university bylaws, prospectus, NOCs, and other official
                documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

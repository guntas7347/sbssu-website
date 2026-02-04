"use client";

import NoticeCard from "@/components/cards/NoticeCard";
import { Filter, Search } from "lucide-react";
import React, { useState } from "react";

const NoticeClient = ({ notices }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "departmental",
    "admissions",
    "examination",
    "recruitment",
    "general",
    "workshop",
    "scholarship",
    "events",
    "other",
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No notices found matching your criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default NoticeClient;

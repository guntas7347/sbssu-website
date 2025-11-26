"use client";

import { useState, useEffect } from "react";
import { Building2, TrendingUp, Users, Filter } from "lucide-react";

interface PlacementRecord {
  id: number;
  year: string;
  company: string;
  sector: string;
  students_placed: number;
  highest_package: string;
  average_package: string;
  roles: string[];
}

export default function PlacementRecordsPage() {
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  useEffect(() => {
    fetch("/data/placement-records.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error loading placement records:", err));
  }, []);

  const years = ["all", ...Array.from(new Set(records.map((r) => r.year)))];
  const sectors = ["all", ...Array.from(new Set(records.map((r) => r.sector)))];

  const filteredRecords = records.filter((record) => {
    const yearMatch = selectedYear === "all" || record.year === selectedYear;
    const sectorMatch =
      selectedSector === "all" || record.sector === selectedSector;
    return yearMatch && sectorMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Placement Records
            </h1>
          </div>
          <p className="text-lg">
            Comprehensive placement statistics and company-wise data
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Filter Records
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector === "all" ? "All Sectors" : sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="grid gap-6">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {record.company}
                          </h3>
                          <p className="text-orange-100 text-sm">
                            {record.sector}
                          </p>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-white text-orange-600 rounded-full font-semibold text-sm">
                        {record.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">
                          {record.students_placed}
                        </p>
                        <p className="text-sm text-gray-600">Students Placed</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">
                          {record.highest_package}
                        </p>
                        <p className="text-sm text-gray-600">Highest Package</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-800">
                          {record.average_package}
                        </p>
                        <p className="text-sm text-gray-600">Average Package</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Roles Offered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {record.roles.map((role, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-lg">
                No placement records found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

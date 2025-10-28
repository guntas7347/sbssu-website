'use client';

import { useState, useEffect } from 'react';
import { Bell, Calendar, Search, Filter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/data/notices.json')
      .then(res => res.json())
      .then(data => setNotices(data.filter((n: any) => n.is_active)))
      .catch(err => console.error('Error loading notices:', err));
  }, []);

  const categories = ['all', 'admissions', 'examination', 'recruitment', 'general', 'workshop', 'scholarship', 'events'];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Bell className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices & Announcements</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Stay updated with the latest news and announcements from SBSSU
          </p>
        </div>
      </div>

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
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <div key={notice.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <div className="flex items-start gap-3 mb-4">
                  <Bell className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2">{notice.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{notice.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(notice.date).toLocaleDateString('en-IN')}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                      {notice.category}
                    </span>
                  </div>
                  {notice.file_url && (
                    <a
                      href={notice.file_url}
                      className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredNotices.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No notices found matching your criteria.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

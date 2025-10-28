'use client';

import { Building } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BOGPage() {
  const bogMembers = [
    { name: 'Dr. Rajneesh Arora', role: 'Chairperson (Vice Chancellor)' },
    { name: 'Shri Amarjit Singh Samra', role: 'Member - Government Nominee' },
    { name: 'Dr. Harpreet Kaur', role: 'Member - UGC Nominee' },
    { name: 'Prof. Sukhwinder Singh', role: 'Member - Academic Expert' },
    { name: 'Shri Kuldeep Singh', role: 'Member - Industry Representative' },
    { name: 'Dr. Manpreet Kaur', role: 'Member - Faculty Representative' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Building className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Board of Governors</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            The governing body responsible for university administration and policy
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About the Board</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Board of Governors is the principal executive body of the university responsible for the general superintendence, direction, and control of the affairs of the university. It ensures that the university functions in accordance with its objectives and statutory provisions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Board Members</h2>
            <div className="space-y-4">
              {bogMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-green-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Meeting Schedule</h3>
            <p className="text-gray-600">
              Regular meetings are held quarterly. Meeting minutes and agendas are published after each session.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

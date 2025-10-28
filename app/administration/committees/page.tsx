'use client';

import { Users, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CommitteesPage() {
  const committees = [
    {
      name: 'Finance Committee',
      purpose: 'Oversees financial planning, budgets, and expenditure',
      members: ['Dr. Rajneesh Arora (Chair)', 'Mr. Gurpreet Singh (Finance Officer)', 'External Member - CA Firm', '2 BOG Members']
    },
    {
      name: 'Building Committee',
      purpose: 'Plans and monitors infrastructure development',
      members: ['Dr. Harpreet Singh Gill (Chair)', 'Dr. Gurpreet Kaur (Civil Dept)', 'Architect', '2 Faculty Members']
    },
    {
      name: 'Purchase Committee',
      purpose: 'Handles procurement of equipment and supplies',
      members: ['Registrar (Chair)', 'Finance Officer', 'Technical Experts', 'Department Representatives']
    },
    {
      name: 'Anti-Ragging Committee',
      purpose: 'Ensures ragging-free campus environment',
      members: ['Dean SW (Chair)', 'Faculty Representatives', 'Student Representatives', 'Parent Representative', 'NGO Representative']
    },
    {
      name: 'Internal Complaints Committee (ICC)',
      purpose: 'Addresses complaints of sexual harassment',
      members: ['Dr. Sukhwinder Kaur (Presiding Officer)', '2 Faculty Members', 'External NGO Member', 'Non-teaching Staff']
    },
    {
      name: 'Examination Committee',
      purpose: 'Oversees examination processes and policies',
      members: ['Controller of Examinations (Chair)', 'Dean Academic', 'All HODs', 'External Experts']
    },
    {
      name: 'Library Committee',
      purpose: 'Recommends library policies and book purchases',
      members: ['Librarian (Convener)', 'Faculty from all departments', 'Student Representatives']
    },
    {
      name: 'Sports Committee',
      purpose: 'Promotes sports and physical activities',
      members: ['Sports Officer (Convener)', 'Faculty Representatives', 'Coaches', 'Student Representatives']
    },
    {
      name: 'Cultural Committee',
      purpose: 'Organizes cultural events and activities',
      members: ['Faculty Coordinator', 'Student Council Representatives', 'Alumni Representatives']
    },
    {
      name: 'Placement Cell',
      purpose: 'Facilitates campus placements and career guidance',
      members: ['Placement Officer (Convener)', 'Faculty from all departments', 'Industry Representatives', 'Alumni']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">University Committees</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Various committees working for smooth functioning of the university
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Committees</h2>
            <p className="text-gray-600 leading-relaxed">
              Various committees have been constituted to ensure effective governance, transparent decision-making, and smooth functioning of different aspects of university operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{committee.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{committee.purpose}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Committee Members:</h4>
                  <ul className="space-y-1">
                    {committee.members.map((member, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

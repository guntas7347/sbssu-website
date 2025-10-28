'use client';

import { useState, useEffect } from 'react';
import { UserCheck, Mail, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ViceChancellorPage() {
  const [vcData, setVcData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/administration.json')
      .then(res => res.json())
      .then(data => {
        const vc = data.find((person: any) => person.category === 'vc');
        setVcData(vc);
      })
      .catch(err => console.error('Error loading VC data:', err));
  }, []);

  if (!vcData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <UserCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vice Chancellor</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Leadership and vision for academic excellence
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={vcData.photo_url}
                  alt={vcData.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{vcData.name}</h2>
                  <p className="text-orange-100 mb-6">{vcData.position}</p>
                  
                  <div className="space-y-3 text-sm">
                    <a href={`mailto:${vcData.contact.split(',')[0]}`} className="flex items-center gap-2 justify-center hover:text-orange-200">
                      <Mail className="w-4 h-4" />
                      <span>{vcData.contact.split(',')[0]}</span>
                    </a>
                    <a href={`tel:${vcData.contact.split(',')[1]}`} className="flex items-center gap-2 justify-center hover:text-orange-200">
                      <Phone className="w-4 h-4" />
                      <span>{vcData.contact.split(',')[1]}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  Message from the Vice Chancellor
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {vcData.message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">About the Vice Chancellor</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Office Hours</h4>
                <p className="text-gray-600">Monday - Friday: 10:00 AM - 5:00 PM</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Office Location</h4>
                <p className="text-gray-600">Administrative Block, 2nd Floor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

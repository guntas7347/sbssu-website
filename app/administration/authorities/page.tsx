'use client';

import { useState, useEffect } from 'react';
import { Shield, Mail, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AuthoritiesPage() {
  const [authorities, setAuthorities] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/administration.json')
      .then(res => res.json())
      .then(data => setAuthorities(data))
      .catch(err => console.error('Error loading authorities:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">University Authorities</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Administrative leadership and organizational structure
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {authorities.map((auth) => (
              <div key={auth.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition">
                <div className="flex gap-4">
                  <img
                    src={auth.photo_url}
                    alt={auth.name}
                    className="w-24 h-24 rounded-lg object-cover border-2 border-orange-600"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{auth.name}</h3>
                    <p className="text-orange-600 font-semibold mb-3">{auth.position}</p>
                    {auth.contact && (
                      <div className="space-y-1 text-sm text-gray-600">
                        {auth.contact.split(',').map((contact: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            {contact.includes('@') ? <Mail className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                            <span>{contact.trim()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {auth.message && (
                  <p className="mt-4 text-sm text-gray-600 line-clamp-3 border-t border-gray-200 pt-4">
                    {auth.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

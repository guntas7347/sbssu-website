'use client';

import { FileText, Mail, Phone, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RTICellPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">RTI Cell</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Right to Information Act, 2005 - Transparency and Accountability
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About RTI</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Right to Information Act, 2005 empowers citizens to seek information from public authorities. SBSSU is committed to transparency and provides information in accordance with the RTI Act.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Citizens can request information by submitting an RTI application along with the prescribed fee to the designated Public Information Officer (PIO).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Public Information Officer (PIO)</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800">Dr. Harpreet Singh Gill</p>
                  <p className="text-sm text-gray-600">Registrar</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-orange-600" />
                  <a href="mailto:rti@sbssu.ac.in" className="hover:text-orange-600">rti@sbssu.ac.in</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span>+91-1632-245010</span>
                </div>
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <p className="text-sm text-gray-600">
                    <strong>Office Hours:</strong> Mon-Fri, 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Appellate Authority</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800">Dr. Rajneesh Arora</p>
                  <p className="text-sm text-gray-600">Vice Chancellor</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  <a href="mailto:vc@sbssu.ac.in" className="hover:text-green-600">vc@sbssu.ac.in</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>+91-1632-245000</span>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-gray-600">
                    <strong>Appeals:</strong> First appellate authority for RTI matters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How to File RTI Application</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Download Application Form</h4>
                  <p className="text-sm text-gray-600">Download the RTI application form from the link below</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Fill Required Details</h4>
                  <p className="text-sm text-gray-600">Fill all mandatory fields in the application form clearly</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Attach Application Fee</h4>
                  <p className="text-sm text-gray-600">Attach DD/IPO of Rs. 10/- in favor of Registrar, SBSSU</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Submit Application</h4>
                  <p className="text-sm text-gray-600">Submit to PIO office or send by post to the university address</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Important Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span><strong>Application Fee:</strong> Rs. 10/- (DD/IPO in favor of Registrar, SBSSU)</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span><strong>Response Time:</strong> Within 30 days from receipt of application</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span><strong>Appeal Period:</strong> Within 30 days if not satisfied with response</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span><strong>BPL Citizens:</strong> No fee required (attach BPL certificate)</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <a href="/downloads/rti-form.pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
                <Download className="w-4 h-4" />
                Download RTI Form
              </a>
              <a href="/downloads/rti-manual.pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                <Download className="w-4 h-4" />
                RTI Manual
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

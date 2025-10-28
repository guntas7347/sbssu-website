import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">About SBSSU</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Shaheed Bhagat Singh State University is a premier technical university in Punjab,
              committed to excellence in education and research.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-orange-400 transition">About Us</Link></li>
              <li><Link href="/administration" className="text-gray-300 hover:text-orange-400 transition">Administration</Link></li>
              <li><Link href="/departments" className="text-gray-300 hover:text-orange-400 transition">Departments</Link></li>
              <li><Link href="/examination" className="text-gray-300 hover:text-orange-400 transition">Examination</Link></li>
              <li><Link href="/placement" className="text-gray-300 hover:text-orange-400 transition">Placements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/notices" className="text-gray-300 hover:text-orange-400 transition">Notices</Link></li>
              <li><Link href="/downloads" className="text-gray-300 hover:text-orange-400 transition">Downloads</Link></li>
              <li><Link href="/grievances" className="text-gray-300 hover:text-orange-400 transition">Grievances</Link></li>
              <li><Link href="/career" className="text-gray-300 hover:text-orange-400 transition">Career</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-orange-400 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-orange-400" />
                <span className="text-gray-300">Moga Road (NH-95), Ferozepur-152004, Punjab, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <a href="tel:+911632245000" className="text-gray-300 hover:text-orange-400">+91-1632-245000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <a href="mailto:info@sbssu.ac.in" className="text-gray-300 hover:text-orange-400">info@sbssu.ac.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Shaheed Bhagat Singh State University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

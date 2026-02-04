export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-orange-400 mb-3">Shaheed Bhagat Singh State University</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Shaheed Bhagat Singh State University<br />
              Ferozepur, Punjab, India
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-400 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Academics</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Admissions</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-400 mb-3">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Phone: +91-1874-245001</li>
              <li>Email: info@sbssferozepur.ac.in</li>
              <li>Website: www.sbssferozepur.ac.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Shaheed Bhagat Singh State University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

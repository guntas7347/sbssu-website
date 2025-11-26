"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Users,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Moga Road (NH-95)", "Ferozepur - 152004", "Punjab, India"],
      color: "orange",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91-1632-245000", "+91-1632-245001"],
      color: "green",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@sbssu.ac.in", "admin@sbssu.ac.in"],
      color: "orange",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 10:00 AM - 5:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
        "Sunday: Closed",
      ],
      color: "green",
    },
  ];

  const departments = [
    {
      name: "Admissions Office",
      email: "admissions@sbssu.ac.in",
      phone: "+91-1632-245010",
    },
    {
      name: "Examination Cell",
      email: "examination@sbssu.ac.in",
      phone: "+91-1632-245020",
    },
    {
      name: "Placement Cell",
      email: "placements@sbssu.ac.in",
      phone: "+91-1632-245030",
    },
    {
      name: "Accounts Department",
      email: "accounts@sbssu.ac.in",
      phone: "+91-1632-245040",
    },
    {
      name: "Academic Section",
      email: "academic@sbssu.ac.in",
      phone: "+91-1632-245050",
    },
    {
      name: "Hostel Office",
      email: "hostel@sbssu.ac.in",
      phone: "+91-1632-245060",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          </div>
          <p className="text-lg">Get in touch with us. We're here to help!</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const bgColor =
                info.color === "orange" ? "bg-orange-100" : "bg-green-100";
              const iconColor =
                info.color === "orange" ? "text-orange-600" : "text-green-600";
              const borderColor =
                info.color === "orange"
                  ? "border-orange-600"
                  : "border-green-600";

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 border-t-4 ${borderColor}`}
                >
                  <div
                    className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Send className="w-6 h-6 text-orange-600" />
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you within
                      24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Message subject"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-green-700 transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Building2 className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="/about"
                    className="block text-gray-600 hover:text-orange-600 transition"
                  >
                    About SBSSU
                  </a>
                  <a
                    href="/admissions"
                    className="block text-gray-600 hover:text-orange-600 transition"
                  >
                    Admissions
                  </a>
                  <a
                    href="/departments"
                    className="block text-gray-600 hover:text-orange-600 transition"
                  >
                    Departments
                  </a>
                  <a
                    href="/career"
                    className="block text-gray-600 hover:text-orange-600 transition"
                  >
                    Careers
                  </a>
                  <a
                    href="/grievances"
                    className="block text-gray-600 hover:text-orange-600 transition"
                  >
                    Grievances
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-xl p-6 text-white">
                <Globe className="w-10 h-10 mb-4" />
                <h3 className="font-bold mb-2">Visit Our Website</h3>
                <p className="text-sm mb-4">
                  Explore more about SBSSU on our official website
                </p>
                <a
                  href="https://sbssu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Department Contacts
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-800 mb-3">{dept.name}</h3>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`mailto:${dept.email}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{dept.email}</span>
                    </a>
                    <a
                      href={`tel:${dept.phone}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{dept.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.4739847642!2d74.60819431512295!3d30.66274098163894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919bfbcbcbcbcbd%3A0x1234567890abcdef!2sSBSSU%20Ferozepur!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

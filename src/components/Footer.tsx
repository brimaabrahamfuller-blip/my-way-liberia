"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-orange-300">My</span>
              <span className="text-white">Way</span>
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Empowering Liberian students, employers, and counselors to build successful careers through mentorship, job matching, and professional development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/career-quiz" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Career Quiz
                </Link>
              </li>
              <li>
                <Link href="/mentorship-request" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Find a Mentor
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">For Users</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/signup?role=student" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Student Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth/signup?role=employer" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Employer Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth/signup?role=counselor" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Counselor Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-300 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-300 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-8 mt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-blue-100 text-sm">
                &copy; {currentYear} MyWay. All rights reserved. Empowering careers in Liberia.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>

            {/* Built By */}
            <div className="text-center md:text-right">
              <p className="text-blue-100 text-sm font-semibold">
                Built by{" "}
                <span className="text-orange-300 font-bold">#NextGents</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Border Accent */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-white to-blue-400"></div>
    </footer>
  );
}

import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - MyWay",
  description: "Privacy Policy for MyWay career platform."
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            User data is collected for platform functionality only and is not sold to third parties. We are committed to protecting your privacy and ensuring you have a positive experience on our platform.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: April 2026
          </p>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

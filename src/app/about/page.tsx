import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About MyWay - Career Platform for Liberia",
  description: "Learn about MyWay, a career platform built for Liberia's next generation of professionals."
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">About MyWay</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            MyWay is a career platform built specifically for Liberia, connecting students with opportunities, employers with talent, and counselors with mentees. We are in active development. More coming soon.
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

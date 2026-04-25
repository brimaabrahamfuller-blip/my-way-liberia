import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">About MyWay</h1>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              MyWay is a career platform built specifically for Liberia. We connect students with job opportunities, employers with pre-screened talent, and counselors with the mentees who need them most.
            </p>
            <p>
              We are in active development. New features, more employers, and expanded mentorship tools are being added regularly. This platform was built by Liberians, for Liberia.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

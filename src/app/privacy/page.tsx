import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Privacy Policy</h1>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              MyWay collects user information — including name, email address, and professional profile data — solely to provide platform functionality. We do not sell, rent, or share your personal data with third parties for commercial purposes. Your data is stored securely using industry-standard practices.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-gray-500 italic">
            Last updated: April 2026
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

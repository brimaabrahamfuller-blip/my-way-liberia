import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Contact Support</h1>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              For platform support, account issues, or general inquiries, reach us at <a href="mailto:support@mywayliberia.com" className="text-blue-600 hover:underline">support@mywayliberia.com</a>. We aim to respond within 48 hours on business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

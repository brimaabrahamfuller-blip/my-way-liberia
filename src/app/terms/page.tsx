import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Terms of Service</h1>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              By creating an account and using MyWay, you agree to engage with the platform honestly and in good faith. You agree not to misrepresent your identity, qualifications, or employer affiliation. Full terms of service are being finalized and will be published here. Thank you for your patience as we build.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

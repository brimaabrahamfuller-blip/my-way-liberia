import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Mentorship Request - Myway"
};

export default async function MentorshipRequest() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Request a Mentor</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Topic or Area</label>
              <input
                type="text"
                placeholder="e.g., Career transition to tech"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tell us about yourself</label>
              <textarea
                placeholder="Your background and what you're looking for in a mentor..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Match Requests - Myway"
};

export default async function MatchRequests() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Mentorship Match Requests</h1>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Student {i} Request</h3>
                  <p className="text-gray-600">Looking for guidance in tech careers</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Pending
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                "I'm transitioning from finance to tech and would love to learn about software development career paths..."
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

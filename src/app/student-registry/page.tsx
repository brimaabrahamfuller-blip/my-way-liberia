import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Student Registry - Myway"
};

export default async function StudentRegistry() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Student Registry</h1>
          <p>Track mentee progress in real time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Student {i}</h3>
              <p className="text-gray-600 mb-3">Career Goal: Software Engineer</p>
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Progress: 65%</p>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

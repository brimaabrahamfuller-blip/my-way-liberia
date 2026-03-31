import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Job Search - Myway",
  description: "Find opportunities matched to your skills"
};

export default async function JobSearch() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Search</h1>
          <p>Find opportunities matched to your skills and career goals</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by job title..."
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input
              type="text"
              placeholder="Location..."
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Match my persona</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2">Senior Software Engineer</h3>
              <p className="text-gray-600 mb-3">Tech Company Ltd</p>
              <p className="text-sm text-gray-600 mb-4">Monrovia, Liberia</p>
              <p className="text-gray-700 mb-4">Looking for experienced engineers to lead our backend team...</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Details & Apply
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

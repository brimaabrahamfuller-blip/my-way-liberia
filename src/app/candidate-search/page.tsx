import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Candidate Search - Myway"
};

export default async function CandidateSearch() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Search Candidates</h1>
          <p>Find talented professionals matched to your needs</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by skill..."
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
            <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none">
              <option>All Personas</option>
              <option>Leader</option>
              <option>Analyst</option>
              <option>Creative</option>
              <option>Supporter</option>
              <option>Explorer</option>
            </select>
            <button className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-green-600">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold">Jane Doe</h3>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Analyst</span>
              </div>
              <p className="text-gray-600 mb-3">Monrovia, Liberia</p>
              <p className="text-sm text-gray-700 mb-4">
                5+ years in backend development, React, Python expertise
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Profile & Contact
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

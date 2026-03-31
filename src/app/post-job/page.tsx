import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Post Job - Myway",
  description: "Publish your job posting and start recruiting"
};

export default async function PostJob() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
          <p>Publish a job posting in 30 seconds</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Job Title</label>
              <input
                type="text"
                placeholder="e.g., Senior Software Engineer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Company</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g., Monrovia, Liberia"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Job Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Career Persona Match</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none">
                <option>Leader</option>
                <option>Analyst</option>
                <option>Creative</option>
                <option>Supporter</option>
                <option>Explorer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Post Job
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

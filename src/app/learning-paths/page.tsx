import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

const placeholderPages = [
  "Learning Paths",
  "AI Coach", 
  "Mentorship Requests",
  "Student Registry",
  "Match Requests",
  "Achievements",
  "Interview Prep",
  "Settings"
];

export const metadata = {
  title: "Feature Pages - Myway"
};

export default async function PlaceholderPages() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Coming Soon</h1>
          <p>More features are being built</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholderPages.map((page) => (
            <div key={page} className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">{page}</h3>
              <p className="text-gray-600 text-sm">
                This feature is under development and will be available soon.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

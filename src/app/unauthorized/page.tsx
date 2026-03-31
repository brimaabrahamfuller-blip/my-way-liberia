import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Unauthorized - Myway"
};

export default async function Unauthorized() {
  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <a href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go to Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}

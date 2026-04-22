import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-xl text-gray-600 mb-8">
            You don't have permission to view this page. Please make sure you're logged in with the correct account role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

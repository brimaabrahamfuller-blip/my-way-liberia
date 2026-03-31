import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect based on role
    const role = (session.user as any)?.role?.toLowerCase();
    if (role === "student") redirect("/dashboard/student");
    if (role === "employer") redirect("/dashboard/employer");
    if (role === "counselor") redirect("/dashboard/counselor");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Myway<span className="text-blue-600">.</span>
          </h1>
          {session ? (
            <div className="flex gap-4">
              <span className="text-gray-600">Welcome, {session.user?.name}</span>
              <Link href="/api/auth/signout" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/auth/signin" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-20">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Career Path Starts Here
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with opportunities, get mentored by industry experts, and build your dream career in Liberia and beyond.
          </p>
          {!session && (
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup?role=student" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Sign Up as Student
              </Link>
              <Link href="/auth/signup?role=employer" className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                Sign Up as Employer
              </Link>
              <Link href="/auth/signup?role=counselor" className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                Sign Up as Counselor
              </Link>
            </div>
          )}
        </section>

        {/* Features */}
        <section className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <p className="text-gray-600">Discover your career path through quizzes, connect with mentors, and build your resume with AI feedback.</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">For Employers</h3>
              <p className="text-gray-600">Post jobs, search for talent matched to your needs, and build your ideal team.</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">For Counselors</h3>
              <p className="text-gray-600">Guide students, manage mentees, and shape the next generation of professionals.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

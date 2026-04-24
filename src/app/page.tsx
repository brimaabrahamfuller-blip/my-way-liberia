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
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Your Career Path Starts Here
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with opportunities, get mentored by industry experts, and build your dream career in Liberia and beyond. MyWay is your complete career companion.
            </p>
            
            {!session && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <Link
                  href="/auth/signup?role=student"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up as Student
                </Link>
                <Link
                  href="/auth/signup?role=employer"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up as Employer
                </Link>
                <Link
                  href="/auth/signup?role=counselor"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up as Counselor
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
            How <span className="text-blue-600">My</span><span className="text-orange-600">Way</span> Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100 hover:border-blue-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">For Students</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Discover your career path through interactive quizzes, connect with experienced mentors, and build a professional resume with AI-powered feedback.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Career guidance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Mentorship matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Resume building
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="group p-8 bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-orange-100 hover:border-orange-300">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">For Employers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Post job opportunities, search for pre-screened talent matched to your needs, and build your ideal team with confidence.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">✓</span> Job posting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">✓</span> Talent search
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">✓</span> Candidate screening
                </li>
              </ul>
            </div>

            {/* For Counselors */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-200 hover:border-orange-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">For Counselors</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Guide students, manage mentees, and shape the next generation of professionals with comprehensive career counseling tools.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Student management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">✓</span> Mentee tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span> Career insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">
            Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔍", title: "Smart Job Matching", desc: "AI-powered job recommendations", comingSoon: false },
              { icon: "👥", title: "Mentorship Network", desc: "Connect with industry experts", comingSoon: false },
              { icon: "📊", title: "Career Analytics", desc: "Track your professional growth", comingSoon: true },
              { icon: "🎓", title: "Learning Paths", desc: "Personalized skill development", comingSoon: true },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all relative">
                {feature.comingSoon && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-700 mb-10">
            Built for Liberia's next generation of professionals. Start your journey today.
          </p>
          
          {!session && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

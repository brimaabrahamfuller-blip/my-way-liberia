import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Your Career Path Starts Here
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Connect with opportunities, get mentored by industry experts, and build your dream career in Liberia and beyond.
            </p>

            {!session && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap px-2">
                <Link
                  href="/auth/signup?role=student"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Sign Up as Student
                </Link>
                <Link
                  href="/auth/signup?role=employer"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Sign Up as Employer
                </Link>
                <Link
                  href="/auth/signup?role=counselor"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Sign Up as Counselor
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-gray-900">
            How <span className="text-blue-600">My</span><span className="text-orange-600">Way</span> Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* For Students */}
            <div className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/students.jpg"
                  alt="Liberian Students"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-xl">For Students</div>
              </div>
              <div className="p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  Discover your career path through interactive quizzes, connect with experienced mentors, and build a professional resume with AI-powered feedback.
                </p>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
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
            </div>

            {/* For Employers */}
            <div className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/employers.jpg"
                  alt="Professional Employers in Liberia"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-xl">For Employers</div>
              </div>
              <div className="p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  Post job opportunities, search for pre-screened talent matched to your needs, and build your ideal team with confidence.
                </p>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
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
            </div>

            {/* For Counselors */}
            <div className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/counselors.jpg"
                  alt="Career Counseling in Liberia"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-xl">For Counselors</div>
              </div>
              <div className="p-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  Guide students, manage mentees, and shape the next generation of professionals with comprehensive career counseling tools.
                </p>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
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
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-white">
            Platform Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🔍", title: "Smart Job Matching", desc: "AI-powered job recommendations" },
              { icon: "👥", title: "Mentorship Network", desc: "Connect with industry experts" },
              { icon: "📊", title: "Career Analytics", desc: "Track your professional growth" },
              { icon: "🎓", title: "Learning Paths", desc: "Personalized skill development" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="text-3xl sm:text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10">
            Join thousands of Liberian professionals already using MyWay to advance their careers.
          </p>

          {!session && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm sm:text-base"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
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

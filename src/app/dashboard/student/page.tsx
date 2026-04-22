import { requireRole } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Student Dashboard | MyWay Liberia",
  description: "Your personalized career guidance and learning hub"
};

export default async function StudentDashboard() {
  await requireRole(["STUDENT"]);
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Student";

  const features = [
    {
      icon: "🎯",
      title: "Career Quiz",
      description: "Discover your professional persona and best-fit careers.",
      href: "/career-quiz",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "💼",
      title: "Job Search",
      description: "Find opportunities matched to your unique skills.",
      href: "/jobs",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "📄",
      title: "Resume Builder",
      description: "Create a professional resume with AI-powered tips.",
      href: "/resume",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "🤝",
      title: "Mentorship",
      description: "Connect with experienced career counselors.",
      href: "/mentorship-request",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "📚",
      title: "Learning Paths",
      description: "Curated courses to help you level up your skills.",
      href: "/learning-paths",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Chat with mentors, employers, and peers.",
      href: "/messages",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "🏆",
      title: "Achievements",
      description: "Track your progress and earn career badges.",
      href: "/achievements",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Manage your profile and account preferences.",
      href: "/settings",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Header */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Ready to take the next step in your career? Explore your personalized dashboard below.
              </p>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-orange-400 opacity-10 rounded-full"></div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Profile Strength", value: "75%", color: "text-blue-600" },
            { label: "Job Matches", value: "12 New", color: "text-orange-600" },
            { label: "Course Progress", value: "3 Active", color: "text-blue-600" },
            { label: "Messages", value: "2 Unread", color: "text-orange-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Feature Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Explore MyWay</h2>
            <div className="h-1 flex-1 mx-4 bg-gray-200 rounded-full hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-2 ${feature.color} flex flex-col h-full`}
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                  Get Started 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

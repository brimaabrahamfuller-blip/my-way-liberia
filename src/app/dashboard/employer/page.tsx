import { requireRole } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Employer Dashboard | MyWay Liberia",
  description: "Find top talent quickly and manage your hiring pipeline"
};

export default async function EmployerDashboard() {
  await requireRole(["EMPLOYER"]);
  const session = await getServerSession(authOptions);
  const companyName = session?.user?.name || "Employer";

  const features = [
    {
      icon: "📋",
      title: "Post a Job",
      description: "Reach thousands of qualified Liberian students and professionals.",
      href: "/post-job",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "🔍",
      title: "Search Candidates",
      description: "Filter talent by skills, experience, and career persona.",
      href: "/candidate-search",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "📊",
      title: "Hiring Analytics",
      description: "Track your job performance and candidate pipeline metrics.",
      href: "/employer-analytics",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Communicate directly with potential hires and counselors.",
      href: "/messages",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "🏢",
      title: "Company Profile",
      description: "Manage your brand presence and company information.",
      href: "/company-profile",
      color: "border-blue-200 hover:border-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Manage your account, team members, and notifications.",
      href: "/settings",
      color: "border-orange-200 hover:border-orange-500",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Header */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {companyName}! 💼</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Find the perfect talent for your team. Manage your job postings and candidates with ease.
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500 opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 -mb-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Jobs", value: "5", color: "text-blue-600" },
            { label: "Total Applicants", value: "124", color: "text-orange-600" },
            { label: "New Messages", value: "8", color: "text-blue-600" },
            { label: "Profile Views", value: "1.2k", color: "text-orange-600" },
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
            <h2 className="text-2xl font-bold text-gray-900">Employer Tools</h2>
            <div className="h-1 flex-1 mx-4 bg-gray-200 rounded-full hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  Manage 
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

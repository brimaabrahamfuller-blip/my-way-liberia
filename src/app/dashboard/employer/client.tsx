"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function EmployerDashboardClient({ session, stats, recentJobs, recentApplications }: any) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { icon: "➕", title: "Post New Job", href: "/post-job", color: "from-green-500 to-green-600" },
    { icon: "🔍", title: "Search Talent", href: "/candidate-search", color: "from-blue-500 to-blue-600" },
    { icon: "📊", title: "View Analytics", href: "/employer-analytics", color: "from-purple-500 to-purple-600" },
    { icon: "💬", title: "Candidate Messages", href: "/messages", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Welcome Message */}
      {showWelcome && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-slide-down bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-2xl border border-green-500 max-w-md">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-bounce">🎉</div>
                <div>
                  <h3 className="text-lg font-bold">Welcome, {session.user.name}!</h3>
                  <p className="text-green-100 text-sm">Your Employer dashboard is ready. Let's find top talent!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <header className="mb-10">
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Employer Portal: {session.user.name} 🏢
              </h1>
              <p className="text-green-50 text-lg max-w-2xl">
                Manage your hiring pipeline and find the best talent in Liberia. Your next great hire is just a search away.
              </p>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-600 rounded-full"></span>
                Hiring Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    className="group flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{action.title}</h3>
                      <p className="text-sm text-gray-500">Launch tool</p>
                    </div>
                    <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent Applicants */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Applicants</h2>
                <Link href="/candidate-search" className="text-green-600 text-sm font-semibold hover:underline">View all</Link>
              </div>
              <div className="space-y-4">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app: any, idx: number) => (
                    <div key={idx} className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-green-50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center text-xl overflow-hidden">👤</div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-bold text-gray-900">{app.user.name}</h4>
                        <p className="text-sm text-gray-500">Applied for {app.job.title}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                          app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                          app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 italic">
                    No applicants yet. Post a job to start receiving applications!
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Active Jobs Summary */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Your Active Jobs</h3>
              <div className="space-y-4">
                {recentJobs.length > 0 ? (
                  recentJobs.map((job: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                      <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{job._count.applications} applicants</span>
                        <Link href={`/jobs/${job.id}`} className="text-xs text-green-600 font-bold hover:underline">Manage</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No active jobs found.</p>
                )}
              </div>
              <Link href="/post-job" className="block w-full mt-6 py-2 text-center bg-green-50 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition-colors">
                Post New Job
              </Link>
            </section>

            {/* Talent Insights */}
            <section className="bg-gradient-to-br from-blue-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2">Talent Insights</h3>
              <p className="text-blue-100 text-sm mb-4">The most searched skills in Liberia this month are: React, Project Management, and Digital Marketing.</p>
              <Link href="/candidate-search" className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-sm font-semibold hover:bg-white/30 transition-all">
                Search Top Talent
              </Link>
            </section>

            {/* Company Profile */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Company Profile</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{session.user.name}</h4>
                  <p className="text-xs text-gray-500">Verified Employer</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-4">Keep your company profile updated to attract high-quality candidates.</p>
              <button className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                Edit Profile
              </button>
            </section>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

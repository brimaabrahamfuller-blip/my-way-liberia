"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CounselorDashboardClient({ session, stats, mentees, pendingRequests }: any) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { icon: "👥", title: "Student Registry", href: "/student-registry", color: "from-purple-500 to-purple-600" },
    { icon: "🤝", title: "Match Requests", href: "/match-requests", color: "from-blue-500 to-blue-600" },
    { icon: "📊", title: "Progress Analytics", href: "/counselor-analytics", color: "from-green-500 to-green-600" },
    { icon: "💬", title: "Mentee Messages", href: "/messages", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Welcome Message */}
      {showWelcome && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-slide-down bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6 shadow-2xl border border-purple-500 max-w-md">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-bounce">🎉</div>
                <div>
                  <h3 className="text-lg font-bold">Welcome, {session.user.name}!</h3>
                  <p className="text-purple-100 text-sm">Your Counselor dashboard is ready. Let's mentor great talent!</p>
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
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-orange-500 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Counselor Portal: {session.user.name} 🤝
              </h1>
              <p className="text-purple-50 text-lg max-w-2xl">
                Guide the next generation of Liberian professionals. Your expertise and mentorship are shaping the future of our workforce.
              </p>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-orange-400/20 rounded-full blur-2xl"></div>
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
                <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                Counseling Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    className="group flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{action.title}</h3>
                      <p className="text-sm text-gray-500">Launch tool</p>
                    </div>
                    <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent Mentee Activity */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Mentees</h2>
                <Link href="/student-registry" className="text-purple-600 text-sm font-semibold hover:underline">View all</Link>
              </div>
              <div className="space-y-4">
                {mentees.length > 0 ? (
                  mentees.map((mentee: any, idx: number) => (
                    <div key={idx} className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center text-xl overflow-hidden">👤</div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-bold text-gray-900">{mentee.student.name}</h4>
                        <p className="text-sm text-gray-500">Mentee since {new Date(mentee.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <Link href={`/student-registry/${mentee.studentId}`} className="text-xs font-bold text-purple-600 hover:underline">View Profile</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 italic">
                    No active mentees yet. Accept match requests to start mentoring!
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Pending Match Requests */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Pending Requests</h3>
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((req: any, idx: number) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm">👤</div>
                        <span className="text-sm font-bold text-gray-900">{req.student.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{req.message || "No message provided."}</p>
                      <Link href="/match-requests" className="text-xs font-bold text-blue-600 hover:underline">Review Request →</Link>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No pending requests at the moment.</p>
                )}
              </div>
              <Link href="/match-requests" className="block w-full mt-6 py-2 text-center bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition-colors">
                Manage All Requests
              </Link>
            </section>

            {/* Counselor Insights */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-lg mb-2">Impact Insights</h3>
              <p className="text-blue-100 text-sm mb-4">Students with mentors are 4x more likely to secure a job within 3 months of graduation in Liberia.</p>
              <Link href="/student-registry" className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-sm font-semibold hover:bg-white/30 transition-all">
                View Student Progress
              </Link>
            </section>

            {/* Counselor Profile */}
            <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Counselor Profile</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🎓</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{session.user.name}</h4>
                  <p className="text-xs text-gray-500">Certified Counselor</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-4">Your profile is visible to students looking for career guidance.</p>
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

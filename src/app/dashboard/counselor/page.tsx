import { requireRole } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Counselor Dashboard - Myway",
  description: "Guide the next generation of Liberian professionals"
};

export default async function CounselorDashboard() {
  await requireRole(["COUNSELOR"]);

  const features = [
    {
      icon: "👥",
      title: "Student Registry",
      description: "Track mentee progress in real time",
      href: "/student-registry"
    },
    {
      icon: "🤝",
      title: "Match Requests",
      description: "Accept new mentorship requests",
      href: "/match-requests"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Communicate with your mentees",
      href: "/messages"
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      description: "Monitor student development metrics",
      href: "/counselor-analytics"
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-12 rounded-xl">
            <h1 className="text-4xl font-bold mb-3">Counselor Portal</h1>
            <p className="text-xl opacity-90">Guide the next generation of Liberian professionals</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8">Welcome to Counselor Dashboard</h2>
          <p className="text-gray-600 mb-8">Manage mentees, track progress, and handle mentorship match requests.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 hover:border-purple-600"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import { requireRole } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Employer Dashboard - Myway",
  description: "Find top talent quickly and manage your hiring pipeline"
};

export default async function EmployerDashboard() {
  await requireRole(["EMPLOYER"]);

  const features = [
    {
      icon: "📋",
      title: "Post Job",
      description: "Publish a job posting in 30 seconds",
      href: "/post-job"
    },
    {
      icon: "🔍",
      title: "Search Candidates",
      description: "Filter by skills, persona, and experience",
      href: "/candidate-search"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Communicate with candidates",
      href: "/messages"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track hiring pipeline and metrics",
      href: "/employer-analytics"
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-12 rounded-xl">
            <h1 className="text-4xl font-bold mb-3">Employer Portal</h1>
            <p className="text-xl opacity-90">Find top talent quickly and manage your hiring pipeline</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8">Welcome to Employer Dashboard</h2>
          <p className="text-gray-600 mb-8">Post jobs, search candidates, and manage your hiring process in real time.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 hover:border-green-600"
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

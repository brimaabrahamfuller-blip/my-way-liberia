import { requireRole } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Student Dashboard - Myway",
  description: "Your personalized career guidance and learning hub"
};

export default async function StudentDashboard() {
  await requireRole(["STUDENT"]);

  const features = [
    {
      icon: "🎯",
      title: "Career Quiz",
      description: "Discover your professional persona in 2 minutes",
      href: "/career-quiz"
    },
    {
      icon: "💬",
      title: "AI Coach",
      description: "Get instant feedback on CVs and interviews",
      href: "/ai-coach"
    },
    {
      icon: "💼",
      title: "Job Search",
      description: "Find opportunities matched to your skills",
      href: "/jobs"
    },
    {
      icon: "📚",
      title: "Learning Paths",
      description: "Curated courses for your career progression",
      href: "/learning-paths"
    },
    {
      icon: "📄",
      title: "Resume Builder",
      description: "Build and polish your professional resume",
      href: "/resume"
    },
    {
      icon: "🤝",
      title: "Mentorship",
      description: "Connect with career counselors",
      href: "/mentorship-request"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Communicate with mentors and peers",
      href: "/messages"
    },
    {
      icon: "🏆",
      title: "Achievements",
      description: "Track your progress and milestones",
      href: "/achievements"
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl">
            <h1 className="text-4xl font-bold mb-3">Student Portal</h1>
            <p className="text-xl opacity-90">Your personalized career guidance and learning hub</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8">Welcome to Your Dashboard</h2>
          <p className="text-gray-600 mb-8">Explore learning paths, job matches, and mentorship opportunities tailored to your career goals.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 hover:border-blue-600"
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

import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Achievements - Myway"
};

export default async function Achievements() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-7xl mx-auto p-8">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Your Achievements</h1>
          <p>Track your milestones and progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🎓", title: "Completed Quiz", desc: "Discovered career persona" },
            { icon: "📄", title: "Resume Ready", desc: "Built professional resume" },
            { icon: "💼", title: "First Application", desc: "Applied to a job" },
            { icon: "🤝", title: "Mentorship Started", desc: "Connected with mentor" },
            { icon: "📚", title: "Course Started", desc: "Began learning path" },
            { icon: "⭐", title: "5-Star Review", desc: "Great performance noted" },
            { icon: "🏆", title: "Top Match", desc: "Perfect job fit found" },
            { icon: "🚀", title: "Dream Role", desc: "Accepted dream job" }
          ].map((achievement, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h3 className="font-bold mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

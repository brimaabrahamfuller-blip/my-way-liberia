import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import StudentDashboardClient from "./client";

export const metadata = {
  title: "Student Dashboard - Myway",
  description: "Your personalized career guidance and learning hub"
};

export default async function StudentDashboard() {
  const session = await requireRole(["STUDENT"]);
  const userId = session.user.id;

  // Fetch real data from the database with relations
  const [applications, savedJobsCount, resume, recentJobs] = await Promise.all([
    prisma.jobApplication.findMany({
      where: { userId },
      include: { job: true },
      orderBy: { appliedAt: 'desc' },
      take: 5
    }),
    prisma.savedJob.count({ where: { userId } }),
    prisma.resume.findUnique({ 
      where: { userId },
      include: { experience: true, education: true }
    }),
    prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    })
  ]);

  const stats = [
    { label: "Applications", value: applications.length, icon: "📨", color: "blue" },
    { label: "Saved Jobs", value: savedJobsCount, icon: "⭐", color: "orange" },
    { label: "Experience", value: resume?.experience.length || 0, icon: "💼", color: "green" },
    { label: "Education", value: resume?.education.length || 0, icon: "🎓", color: "purple" },
  ];

  return (
    <StudentDashboardClient 
      session={session} 
      stats={stats} 
      resume={resume}
      recentApplications={applications}
      recommendedJobs={recentJobs}
    />
  );
}

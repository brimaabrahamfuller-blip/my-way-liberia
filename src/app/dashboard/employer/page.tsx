import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import EmployerDashboardClient from "./client";

export const metadata = {
  title: "Employer Dashboard - Myway",
  description: "Find top talent quickly and manage your hiring pipeline"
};

export default async function EmployerDashboard() {
  const session = await requireRole(["EMPLOYER"]);
  const companyName = session.user.name || "";
  
  // Fetch real data from the database
  const [jobs, applications] = await Promise.all([
    prisma.job.findMany({
      where: { company: companyName },
      include: { _count: { select: { applications: true } } },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.jobApplication.findMany({ 
      where: { 
        job: { company: companyName } 
      },
      include: { user: true, job: true },
      orderBy: { appliedAt: 'desc' },
      take: 5
    }),
  ]);

  const activeJobsCount = jobs.length;
  const totalApplicationsCount = jobs.reduce((acc, job) => acc + job._count.applications, 0);

  const stats = [
    { label: "Active Jobs", value: activeJobsCount, icon: "📋", color: "green" },
    { label: "Total Applicants", value: totalApplicationsCount, icon: "👥", color: "blue" },
    { label: "New Messages", value: 0, icon: "💬", color: "orange" },
    { label: "Hiring Rate", value: "0%", icon: "📈", color: "purple" },
  ];

  return (
    <EmployerDashboardClient 
      session={session} 
      stats={stats}
      recentJobs={jobs.slice(0, 3)}
      recentApplications={applications}
    />
  );
}

import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import CounselorDashboardClient from "./client";

export const metadata = {
  title: "Counselor Dashboard - Myway",
  description: "Guide the next generation of Liberian professionals"
};

export default async function CounselorDashboard() {
  const session = await requireRole(["COUNSELOR"]);
  const userId = session.user.id;
  
  // Fetch real data from the database
  const [mentees, pendingRequests] = await Promise.all([
    prisma.mentorshipRequest.findMany({ 
      where: { 
        mentorId: userId,
        status: "ACCEPTED"
      },
      include: { student: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.mentorshipRequest.findMany({ 
      where: { 
        mentorId: userId,
        status: "PENDING"
      },
      include: { student: true },
      orderBy: { createdAt: 'desc' }
    }),
  ]);

  const stats = [
    { label: "Active Mentees", value: mentees.length, icon: "👥", color: "purple" },
    { label: "Match Requests", value: pendingRequests.length, icon: "🤝", color: "blue" },
    { label: "New Messages", value: 0, icon: "💬", color: "orange" },
    { label: "Success Rate", value: "0%", icon: "📈", color: "green" },
  ];

  return (
    <CounselorDashboardClient 
      session={session} 
      stats={stats}
      mentees={mentees}
      pendingRequests={pendingRequests}
    />
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Job Search | MyWay Liberia",
  description: "Find career opportunities in and around Liberia",
};

export default async function JobSearch() {
  const session = await getServerSession(authOptions);

  // Fetch real jobs from database
  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  // Fallback sample data if database is empty
  if (jobs.length === 0) {
    jobs = [
      {
        id: "sample-1",
        title: "NGO Program Officer",
        company: "Mercy Corps Liberia",
        location: "Monrovia",
        jobType: "Full-time",
        description: "Coordinate community development programs and manage local stakeholder relationships.",
        createdAt: new Date(),
      },
      {
        id: "sample-2",
        title: "Bank Teller",
        company: "Ecobank Liberia",
        location: "Gbarnga, Bong County",
        jobType: "Full-time",
        description: "Process customer transactions and provide excellent financial services to the community.",
        createdAt: new Date(),
      },
      {
        id: "sample-3",
        title: "Logistics Coordinator",
        company: "Liberia Port Authority",
        location: "Buchanan, Grand Bassa",
        jobType: "Contract",
        description: "Manage supply chain operations and oversee port-to-warehouse transportation logistics.",
        createdAt: new Date(),
      },
      {
        id: "sample-4",
        title: "School Administrator",
        company: "Light Academy",
        location: "Paynesville",
        jobType: "Full-time",
        description: "Oversee daily school operations, faculty scheduling, and student enrollment processes.",
        createdAt: new Date(),
      },
      {
        id: "sample-5",
        title: "Telecom Sales Representative",
        company: "Lonestar Cell MTN",
        location: "Monrovia",
        jobType: "Part-time",
        description: "Drive mobile money adoption and provide technical support to regional distributors.",
        createdAt: new Date(),
      },
      {
        id: "sample-6",
        title: "Health Data Clerk",
        company: "Ministry of Health",
        location: "Robertsport, Grand Cape Mount",
        jobType: "Full-time",
        description: "Maintain accurate patient records and support regional health surveillance reporting.",
        createdAt: new Date(),
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-orange-500 text-white p-8 md:p-12 rounded-2xl shadow-lg mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Next Opportunity</h1>
          <p className="text-lg opacity-90">Browse open opportunities across Liberia. Sign in to apply.</p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {job.title}
                  </h3>
                  <span className="shrink-0 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full ml-2">
                    {job.jobType.replace("_", " ")}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-blue-600 font-semibold">{job.company}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                  {job.description}
                </p>
              </div>

              {session ? (
                <Link
                  href={`/jobs/${job.id}/apply`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Apply Now
                </Link>
              ) : (
                <Link
                  href={`/auth/signin?callbackUrl=/jobs`}
                  className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Sign in to Apply
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Empty State if absolutely nothing found */}
        {jobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900">No jobs found</h2>
            <p className="text-gray-600 mt-2">Check back later for new opportunities in Liberia.</p>
          </div>
        )}
      </main>
    </div>
  );
}

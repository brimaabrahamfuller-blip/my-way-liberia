import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Job Search | MyWay Liberia",
  description: "Find career opportunities in and around Liberia"
};

export default async function JobSearch() {
  await requireAuth();

  // Mock data for aggregated jobs from Liberian sites
  const aggregatedJobs = [
    {
      id: 1,
      title: "Project Manager",
      company: "NGO Liberia",
      location: "Monrovia",
      source: "Executive Job",
      sourceUrl: "https://www.executivejob.com.lr",
      posted: "2 days ago",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Finance Officer",
      company: "International Bank",
      location: "Monrovia",
      source: "Liberia Job",
      sourceUrl: "https://www.liberiajob.com",
      posted: "1 day ago",
      type: "Full-time"
    },
    {
      id: 3,
      title: "IT Specialist",
      company: "Tech Solutions",
      location: "Paynesville",
      source: "Job Liberia",
      sourceUrl: "https://www.jobliberia.com",
      posted: "3 days ago",
      type: "Contract"
    },
    {
      id: 4,
      title: "Healthcare Assistant",
      company: "City Hospital",
      location: "Monrovia",
      source: "Executive Job",
      sourceUrl: "https://www.executivejob.com.lr",
      posted: "5 hours ago",
      type: "Part-time"
    },
    {
      id: 5,
      title: "Logistics Coordinator",
      company: "Global Logistics",
      location: "Buchanan",
      source: "Liberia Job",
      sourceUrl: "https://www.liberiajob.com",
      posted: "4 days ago",
      type: "Full-time"
    },
    {
      id: 6,
      title: "Marketing Associate",
      company: "Creative Agency",
      location: "Monrovia",
      source: "Job Liberia",
      sourceUrl: "https://www.jobliberia.com",
      posted: "1 week ago",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-orange-500 text-white p-8 md:p-12 rounded-2xl shadow-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Next Opportunity</h1>
          <p className="text-lg opacity-90">We aggregate jobs from across Liberia to help you find the perfect match.</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Job title or keyword..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Location (e.g. Monrovia)..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Latest Job Openings</h2>
              <span className="text-sm text-gray-500">{aggregatedJobs.length} jobs found</span>
            </div>
            
            {aggregatedJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.posted}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
                    </svg>
                    Source: <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold">{job.source}</a>
                  </div>
                </div>
                
                <a 
                  href={job.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  View on {job.source}
                </a>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Job Sources</h3>
              <div className="space-y-3">
                {[
                  { name: "Executive Job Liberia", url: "https://www.executivejob.com.lr" },
                  { name: "Liberia Job", url: "https://www.liberiajob.com" },
                  { name: "Job Liberia", url: "https://www.jobliberia.com" },
                ].map((source) => (
                  <a 
                    key={source.name}
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <span className="text-sm text-gray-700 font-medium">{source.name}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
              <h3 className="font-bold text-lg mb-2">Get Job Alerts</h3>
              <p className="text-sm opacity-90 mb-4">Be the first to know when new jobs are posted in your field.</p>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full p-2 rounded bg-white/20 border border-white/30 placeholder:text-white/60 text-white mb-3 outline-none focus:bg-white/30"
              />
              <button className="w-full bg-white text-orange-600 font-bold py-2 rounded hover:bg-orange-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

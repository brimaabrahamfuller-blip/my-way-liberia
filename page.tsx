"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function EditProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, location, skills: skills.split(',').map(s => s.trim()) }),
      });
      if (res.ok) router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!session) return null;

  return (
    <div>
      <Navbar user={session.user} />
      <main className="max-w-2xl mx-auto p-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold mb-6">Update Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Professional Bio</label>
              <textarea 
                className="w-full p-3 border border-gray-200 rounded-lg h-32 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about your background and career goals..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
              <input type="text" className="w-full p-3 border border-gray-200 rounded-lg text-sm" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Monrovia, Liberia" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Skills (comma separated)</label>
              <input type="text" className="w-full p-3 border border-gray-200 rounded-lg text-sm" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Data Analysis, Project Management" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition-all disabled:opacity-50" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  grade: string | null;
  description: string | null;
}

interface Resume {
  id: string;
  title: string | null;
  summary: string | null;
  skills: string[];
  certifications: string[];
  languages: string[];
}

export default function ResumeBuilder() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Resume state
  const [resume, setResume] = useState<Resume>({
    id: "",
    title: "",
    summary: "",
    skills: [],
    certifications: [],
    languages: []
  });

  // Experience and Education states  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  // Form inputs
  const [activeTab, setActiveTab] = useState<"overview" | "experience" | "education">("overview");
  const [newExperience, setNewExperience] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: ""
  });

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: ""
  });

  // Load resume data on mount
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      loadResumeData();
    }
  }, [status, router]);

  const loadResumeData = async () => {
    try {
      setLoading(true);
      const [resumeRes, expRes, eduRes] = await Promise.all([
        fetch("/api/resume"),
        fetch("/api/experience"),
        fetch("/api/education")
      ]);

      if (!resumeRes.ok || !expRes.ok || !eduRes.ok) throw new Error("Failed to load data");

      const resumeData = await resumeRes.json();
      const expData = await expRes.json();
      const eduData = await eduRes.json();

      if (resumeData.id) setResume(resumeData);
      setExperiences(expData || []);
      setEducation(eduData || []);
    } catch (err) {
      setError("Failed to load resume data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    try {
      setSaving(true);
      const skillsArray = resume.skills.length ? resume.skills : 
        (typeof resume.skills === "string" ? (resume.skills as any).split(",").map((s: string) => s.trim()) : []);
      
      const res = await fetch("/api/resume", {
        method: resume.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resume.title,
          summary: resume.summary,
          skills: skillsArray,
          certifications: resume.certifications,
          languages: resume.languages
        })
      });

      if (!res.ok) throw new Error("Failed to save resume");

      const data = await res.json();
      setResume(data);
      setError("");
    } catch (err) {
      setError("Failed to save resume");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addExperience = async () => {
    if (!newExperience.jobTitle || !newExperience.company) {
      setError("Job title and company are required");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience)
      });

      if (!res.ok) throw new Error("Failed to add experience");

      const data = await res.json();
      setExperiences([...experiences, data]);
      setNewExperience({
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: ""
      });
      setError("");
    } catch (err) {
      setError("Failed to add experience");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (err) {
      setError("Failed to delete experience");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addEducation = async () => {
    if (!newEducation.institution || !newEducation.degree) {
      setError("Institution and degree are required");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEducation)
      });

      if (!res.ok) throw new Error("Failed to add education");

      const data = await res.json();
      setEducation([...education, data]);
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        description: ""
      });
      setError("");
    } catch (err) {
      setError("Failed to add education");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setEducation(education.filter(e => e.id !== id));
    } catch (err) {
      setError("Failed to delete education");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-center">Loading resume...</div>;
  }

  return (
    <div className="container max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
        <p className="text-gray-600">Build your professional resume section by section</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-4">
          {(["overview", "experience", "education"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Professional Overview</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Professional Title</label>
              <input
                type="text"
                value={resume.title || ""}
                onChange={e => setResume({ ...resume, title: e.target.value })}
                placeholder="e.g., Senior Software Engineer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Professional Summary</label>
              <textarea
                value={resume.summary || ""}
                onChange={e => setResume({ ...resume, summary: e.target.value })}
                placeholder="Brief overview of your career..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Skills (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(resume.skills) ? resume.skills.join(", ") : ""}
                onChange={e => setResume({ ...resume, skills: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="e.g., JavaScript, React, Python"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Languages (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(resume.languages) ? resume.languages.join(", ") : ""}
                onChange={e => setResume({ ...resume, languages: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="e.g., English, French, Spanish"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              onClick={saveResume}
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Save Overview"}
            </button>
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Add Work Experience</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newExperience.jobTitle}
                  onChange={e => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                  placeholder="Job Title"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={e => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Company"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <input
                type="text"
                value={newExperience.location}
                onChange={e => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newExperience.startDate}
                  onChange={e => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="date"
                  value={newExperience.endDate}
                  onChange={e => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.isCurrent}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newExperience.isCurrent}
                  onChange={e => setNewExperience({ ...newExperience, isCurrent: e.target.checked, endDate: "" })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Currently working here</span>
              </label>

              <textarea
                value={newExperience.description}
                onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Description of role and responsibilities..."
                className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={addExperience}
                disabled={saving}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? "Adding..." : "Add Experience"}
              </button>
            </div>
          </div>

          {/* Experience List */}
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "N/A"}
                </p>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Add Education</h2>

            <div className="space-y-4">
              <input
                type="text"
                value={newEducation.institution}
                onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })}
                placeholder="Institution/University"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Degree"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={newEducation.fieldOfStudy}
                  onChange={e => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                  placeholder="Field of Study"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="date"
                  value={newEducation.startDate}
                  onChange={e => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="date"
                  value={newEducation.endDate}
                  onChange={e => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  value={newEducation.grade}
                  onChange={e => setNewEducation({ ...newEducation, grade: e.target.value })}
                  placeholder="Grade (e.g., 3.8/4.0)"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <textarea
                value={newEducation.description}
                onChange={e => setNewEducation({ ...newEducation, description: e.target.value })}
                placeholder="Additional details..."
                className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                onClick={addEducation}
                disabled={saving}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? "Adding..." : "Add Education"}
              </button>
            </div>
          </div>

          {/* Education List */}
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(edu.startDate).toLocaleDateString()} -{" "}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

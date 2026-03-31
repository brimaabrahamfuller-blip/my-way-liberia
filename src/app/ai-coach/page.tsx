"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AI Coach - Myway"
};

export default function AiCoach() {
  const [question, setQuestion] = useState("");
  const [persona, setPersona] = useState("Explorer");
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please enter a question or prompt.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question.trim(),
          persona,
          history: conversation.map((entry) => ({ role: entry.role, content: entry.text }))
        })
      });

      if (!res.ok) {
        throw new Error("AI coach failed");
      }

      const data = await res.json();
      setConversation([
        ...conversation,
        { role: "user", text: question.trim() },
        { role: "assistant", text: data.response }
      ]);
      setQuestion("");
    } catch (err) {
      console.error(err);
      setError("Unable to generate response right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container max-w-5xl mx-auto p-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-xl mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Coach</h1>
          <p>Get instant, practical feedback based on your context and persona.</p>
        </div>

        <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask: 'Improve my resume objective for software engineering roles.'"
                className="w-full rounded-lg border border-gray-300 p-3 h-28 focus:ring-blue-500 focus:outline-none"
              />

              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Leader">Leader</option>
                <option value="Analyst">Analyst</option>
                <option value="Creative">Creative</option>
                <option value="Supporter">Supporter</option>
                <option value="Explorer">Explorer</option>
              </select>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Ask AI Coach"}
            </button>
          </form>

          {error && <p className="text-red-600 mt-3">{error}</p>}
        </section>

        <section className="space-y-4">
          {[...conversation].reverse().map((entry, idx) => (
            <div key={`${idx}-${entry.text}`} className="space-y-2">
              <div className={`${entry.role === "user" ? "rounded-lg bg-blue-50 border-blue-200" : "rounded-lg bg-gray-100 border-gray-200"} p-4 border`}>
                <p className="text-sm font-semibold text-gray-700">{entry.role === "user" ? "You" : "AI Coach"}:</p>
                <p>{entry.text}</p>
              </div>
            </div>
          ))}
          {conversation.length === 0 && (
            <p className="text-gray-600">Ask a question to get personalized coaching suggestions.</p>
          )}
        </section>
      </main>
    </div>
  );
}


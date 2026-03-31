"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [view, setView] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: signupRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // Auto-login after signup
      await signIn("credentials", {
        email: signupEmail,
        password: signupPassword,
        redirect: false,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <main>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Myway<span>.</span></div>
        <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
          AI-Powered Career Mentorship
        </p>
      </nav>

      {/* Auth Form */}
      <div className="form-card">
        {view === "login" ? (
          <>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem", textAlign: "center" }}>
              Welcome Back to Myway
            </h2>
            <form onSubmit={handleLogin}>
              <input
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />
              <input
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-500">
              New to Myway?{" "}
              <button onClick={() => { setView("signup"); setError(""); }}
                className="text-blue-700 font-semibold">
                Create an account
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem", textAlign: "center" }}>
              Join Myway
            </h2>
            <form onSubmit={handleSignup}>
              <input
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                type="text"
                placeholder="Full Name"
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
                required
              />
              <input
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                type="email"
                placeholder="Email Address"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                required
              />
              <input
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                type="password"
                placeholder="Password (min 8 chars)"
                minLength={8}
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                required
              />
              <select
                className="w-full p-3 mb-3 border border-gray-200 rounded-lg text-base"
                value={signupRole}
                onChange={e => setSignupRole(e.target.value)}
                required
              >
                <option value="" disabled>Select Your Role</option>
                <option value="STUDENT">Student / Graduate</option>
                <option value="EMPLOYER">Employer</option>
                <option value="COUNSELOR">Career Counselor</option>
              </select>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Create Account"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button onClick={() => { setView("login"); setError(""); }}
                className="text-blue-700 font-semibold">
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}

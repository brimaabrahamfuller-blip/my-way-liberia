"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Myway<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

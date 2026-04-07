"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}

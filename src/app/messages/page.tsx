import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Messages - Myway"
};

export default async function Messages() {
  await requireAuth();

  return (
    <div>
      <Navbar />
      <main className="container max-w-4xl mx-auto p-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-gray-600 mb-4">Coming soon: Real-time messaging between users</p>
          <p className="text-sm text-gray-500">Chat feature is being built with WebSocket support for instant messaging</p>
        </div>
      </main>
    </div>
  );
}

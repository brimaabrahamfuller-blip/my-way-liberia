"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <p className="text-sm text-red-700 font-mono break-words">
            {error.message || "Unknown error occurred"}
          </p>
          {error.digest && (
            <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

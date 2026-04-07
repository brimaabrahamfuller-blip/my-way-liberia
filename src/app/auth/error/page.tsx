"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Callback: "There was an error with the authentication callback.",
    OAuthSignin: "There was an error signing in with OAuth.",
    OAuthCallback: "There was an error with the OAuth callback.",
    OAuthCreateAccount: "Could not create OAuth account.",
    EmailCreateAccount: "Could not create email account.",
    OAuthAccountNotLinked:
      "Email is already associated with another account.",
    EmailSignInError: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided.",
    default: "An authentication error occurred.",
  };

  const message = errorMessages[error as string] || errorMessages.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Myway<span className="text-blue-600">.</span>
          </h1>
          <p className="text-gray-600 mt-2">Career Platform for Liberia</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Authentication Error
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Again
              </Link>
              <Link
                href="/"
                className="block w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Need help?{" "}
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

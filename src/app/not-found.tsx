export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist. It may have been removed or the URL might be incorrect.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

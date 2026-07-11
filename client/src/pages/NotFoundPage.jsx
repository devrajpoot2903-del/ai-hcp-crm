import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">Page not found.</p>
      <Link to="/" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage

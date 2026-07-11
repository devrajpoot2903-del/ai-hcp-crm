import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          AI HCP CRM
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { useLocation } from 'react-router-dom'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { toggleSidebar } from '../redux/slices/uiSlice'
import { MenuIcon, BellIcon, UserIcon, SparklesIcon } from './ui/Icons'

const PAGE_TITLES = {
  '/':             'Dashboard',
  '/interactions': 'Log Interaction',
  '/history':      'Interaction History',
  '/settings':     'Settings',
}

export default function Navbar() {
  const dispatch  = useAppDispatch()
  const sidebarOpen = useAppSelector(s => s.ui.sidebarOpen)
  const location  = useLocation()
  const title     = PAGE_TITLES[location.pathname] || 'AI HCP CRM'

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-20 h-16 flex items-center"
      style={{ left: sidebarOpen ? '240px' : '64px', transition: 'left 0.3s ease-in-out' }}
    >
      <div className="flex items-center justify-between w-full px-5">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="btn-ghost rounded-lg p-2"
            title="Toggle sidebar"
          >
            <MenuIcon size={18} />
          </button>
          <div>
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            <p className="text-xs text-gray-400">AI-powered HCP relationship management</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* AI Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-medium">
            <SparklesIcon size={12} />
            <span>AI Ready</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="btn-ghost rounded-xl p-2 relative">
              <BellIcon size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>

          {/* User avatar */}
          <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <UserIcon size={14} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">Sales Rep</p>
              <p className="text-[10px] text-gray-400">Medical Affairs</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

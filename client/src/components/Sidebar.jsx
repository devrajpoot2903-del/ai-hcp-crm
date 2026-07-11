import { NavLink, useLocation } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { setSidebarOpen } from '../redux/slices/uiSlice'
import {
  HomeIcon, PlusIcon, ListIcon, SettingsIcon,
  ActivityIcon, ChevronLeft, ChevronRight, SparklesIcon,
} from './ui/Icons'

const NAV_ITEMS = [
  { path: '/',             label: 'Dashboard',    icon: HomeIcon       },
  { path: '/interactions', label: 'Log Interaction',icon: PlusIcon      },
  { path: '/history',      label: 'History',       icon: ListIcon       },
  { path: '/settings',     label: 'Settings',      icon: SettingsIcon   },
]

export default function Sidebar() {
  const dispatch  = useAppDispatch()
  const open      = useAppSelector(s => s.ui.sidebarOpen)
  const location  = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-20 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-30
        transition-all duration-300 ease-in-out
        ${open ? 'w-60' : 'w-16'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 min-h-[65px]">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <SparklesIcon size={16} className="text-white" />
          </div>
          {open && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 leading-tight whitespace-nowrap">AI HCP CRM</p>
              <p className="text-[10px] text-gray-400 whitespace-nowrap">Healthcare Intelligence</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {open && (
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>
          )}
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const isActive = path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(path)
            return (
              <NavLink
                key={path}
                to={path}
                title={!open ? label : undefined}
                className={`sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {open && <span className="truncate">{label}</span>}
                {isActive && open && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Activity section */}
        {open && (
          <div className="px-3 py-4 border-t border-gray-100">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <ActivityIcon size={14} className="text-blue-600" />
                <p className="text-xs font-semibold text-blue-700">Today's Summary</p>
              </div>
              <p className="text-[10px] text-blue-500 leading-relaxed">12 interactions logged · 34 follow-ups pending</p>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => dispatch(setSidebarOpen(!open))}
          className="flex items-center justify-center h-10 border-t border-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          title={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  )
}

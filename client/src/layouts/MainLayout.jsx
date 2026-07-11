import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ToastContainer from '../components/ui/Toast'
import useAppSelector from '../hooks/useAppSelector'

export default function MainLayout() {
  const sidebarOpen = useAppSelector(s => s.ui.sidebarOpen)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area shifts with sidebar */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? '240px' : '64px' }}
      >
        {/* Top Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 pt-16">
          <div className="px-5 py-6 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global toast container */}
      <ToastContainer />
    </div>
  )
}

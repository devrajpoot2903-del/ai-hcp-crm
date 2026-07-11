import { useNavigate } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import DashboardCard from '../components/ui/DashboardCard'
import InteractionTable from '../components/interactions/InteractionTable'
import { TypeBadge, OutcomeBadge } from '../components/ui/Badge'
import {
  UsersIcon, ActivityIcon, ClockIcon, CalendarIcon,
  PlusIcon, ListIcon, SparklesIcon, CheckCircle,
} from '../components/ui/Icons'

function QuickActionCard({ icon: Icon, label, description, onClick, color }) {
  const colors = {
    blue:   'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green:  'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  }
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-150 w-full border border-transparent hover:border-gray-200 ${colors[color] || colors.blue}`}
    >
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm flex-shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs opacity-70 mt-0.5 leading-snug">{description}</p>
      </div>
    </button>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { stats, recentActivity, isLoading } = useAppSelector(s => s.dashboard)

  const statCards = [
    { title: 'Total HCPs',           value: stats.totalHCPs,          subtitle: 'Active in your territory',  icon: UsersIcon,    color: 'blue',   change: 4.2  },
    { title: "Today's Interactions", value: stats.todayInteractions,  subtitle: 'Logged interactions today', icon: ActivityIcon, color: 'green',  change: 12.0 },
    { title: 'Pending Follow-ups',   value: stats.pendingFollowUps,   subtitle: 'Require your attention',    icon: ClockIcon,    color: 'yellow', change: -2.1 },
    { title: 'Meetings This Week',   value: stats.thisWeekMeetings,   subtitle: 'Scheduled & completed',     icon: CalendarIcon, color: 'purple', change: 8.3  },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Good day, Sales Representative</p>
            <h2 className="text-2xl font-bold mb-1">AI HCP CRM Dashboard</h2>
            <p className="text-blue-200 text-sm">Your AI-powered healthcare relationship management hub</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white border-opacity-20">
            <SparklesIcon size={16} className="text-blue-200" />
            <span className="text-sm font-medium text-white">AI Ready</span>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => navigate('/interactions')}
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            <PlusIcon size={15} /> Log Interaction
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
          >
            <ListIcon size={15} /> View History
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(c => (
          <DashboardCard key={c.title} {...c} loading={isLoading} />
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
                <p className="text-xs text-gray-400 mt-0.5">Latest HCP interactions</p>
              </div>
              <button onClick={() => navigate('/history')} className="text-xs text-blue-600 font-medium hover:underline">
                View all →
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map(act => (
                <div key={act.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600">
                      {act.hcp.split(' ').pop()?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{act.hcp}</p>
                    <p className="text-xs text-gray-400 truncate">{act.topic}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <TypeBadge type={act.type} />
                    <OutcomeBadge outcome={act.outcome} />
                  </div>
                  <p className="text-[11px] text-gray-400 whitespace-nowrap hidden sm:block">{act.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <QuickActionCard
              icon={PlusIcon}
              label="Log Interaction"
              description="Record a new HCP touchpoint"
              onClick={() => navigate('/interactions')}
              color="blue"
            />
            <QuickActionCard
              icon={ListIcon}
              label="View History"
              description="Browse all logged interactions"
              onClick={() => navigate('/history')}
              color="green"
            />
            <QuickActionCard
              icon={SparklesIcon}
              label="AI Assistant"
              description="Get AI insights and suggestions"
              onClick={() => navigate('/interactions')}
              color="purple"
            />
            <QuickActionCard
              icon={CheckCircle}
              label="Follow-up Queue"
              description="Review pending follow-up tasks"
              onClick={() => navigate('/history')}
              color="yellow"
            />
          </div>
        </div>
      </div>

      {/* Recent Interactions Table (compact) */}
      <InteractionTable compact />
    </div>
  )
}

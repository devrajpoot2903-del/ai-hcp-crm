import { TrendingUp, ChevronUp, ChevronDown } from './Icons'

const COLORS = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700',   border: 'border-blue-100'  },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  badge: 'bg-green-100 text-green-700',  border: 'border-green-100' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700',border: 'border-yellow-100'},
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700',border: 'border-purple-100'},
  red:    { bg: 'bg-red-50',    icon: 'text-red-600',    badge: 'bg-red-100 text-red-700',      border: 'border-red-100'   },
}

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} props.subtitle
 * @param {React.ReactNode} props.icon
 * @param {'blue'|'green'|'yellow'|'purple'|'red'} props.color
 * @param {number} [props.change]   – percentage change e.g. 12.5
 * @param {boolean} [props.loading]
 */
export default function DashboardCard({ title, value, subtitle, icon: Icon, color = 'blue', change, loading }) {
  const c = COLORS[color] || COLORS.blue
  const isPositive = change >= 0

  if (loading) {
    return (
      <div className="card p-5 space-y-3 animate-pulse">
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-7 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  return (
    <div className={`card p-5 hover:shadow-md transition-shadow duration-200 border-t-2 ${c.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center`}>
          {Icon && <Icon size={20} className={c.icon} />}
        </div>
        {change !== undefined && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isPositive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  )
}

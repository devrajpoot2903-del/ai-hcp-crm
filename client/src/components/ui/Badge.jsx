/** Reusable Badge component */

const VARIANTS = {
  blue:   'badge-blue',
  green:  'badge-green',
  yellow: 'badge-yellow',
  red:    'badge-red',
  gray:   'badge-gray',
  purple: 'badge-purple',
}

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span className={`${VARIANTS[variant] || VARIANTS.gray} ${className}`}>
      {children}
    </span>
  )
}

/** Helpers for common domain values */
export function OutcomeBadge({ outcome }) {
  const map = { Successful: 'green', Neutral: 'yellow', Unsuccessful: 'red' }
  return <Badge variant={map[outcome] || 'gray'}>{outcome}</Badge>
}

export function PriorityBadge({ priority }) {
  const map = { High: 'red', Medium: 'yellow', Low: 'blue' }
  return <Badge variant={map[priority] || 'gray'}>{priority}</Badge>
}

export function StatusBadge({ status }) {
  const map = { Completed: 'green', Pending: 'yellow', Cancelled: 'red' }
  return <Badge variant={map[status] || 'gray'}>{status}</Badge>
}

export function TypeBadge({ type }) {
  const map = { Meeting: 'blue', Call: 'purple', Email: 'gray', Conference: 'yellow', Visit: 'green' }
  return <Badge variant={map[type] || 'gray'}>{type}</Badge>
}

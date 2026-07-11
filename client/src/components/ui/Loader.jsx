import { SpinnerIcon } from './Icons'

/** Full-page loader */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <SpinnerIcon size={32} className="animate-spin text-blue-600" />
        <p className="text-sm font-medium text-gray-500">Loading…</p>
      </div>
    </div>
  )
}

/** Inline button/small spinner */
export function Spinner({ size = 16, className = '' }) {
  return <SpinnerIcon size={size} className={`animate-spin ${className}`} />
}

/** Section loader */
export function SectionLoader({ text = 'Loading data…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <SpinnerIcon size={28} className="animate-spin text-blue-500" />
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  )
}

export default PageLoader

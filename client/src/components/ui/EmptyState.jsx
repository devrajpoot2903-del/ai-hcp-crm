import { ClipboardIcon, SearchIcon } from './Icons'

const PRESETS = {
  noInteractions: {
    icon: ClipboardIcon,
    title: 'No interactions logged',
    description: 'Start by logging your first HCP interaction to track your outreach activity.',
  },
  noResults: {
    icon: SearchIcon,
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
  },
}

export default function EmptyState({ type = 'noInteractions', title, description, action }) {
  const preset = PRESETS[type] || PRESETS.noInteractions
  const Icon = preset.icon
  const heading = title || preset.title
  const body = description || preset.description

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-blue-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1.5">{heading}</h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{body}</p>
      {action && (
        <div className="mt-5">{action}</div>
      )}
    </div>
  )
}

import InteractionTable from '../components/interactions/InteractionTable'
import { ListIcon, DownloadIcon, FilterIcon } from '../components/ui/Icons'

export default function HistoryPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <ListIcon size={16} className="text-blue-600" />
            <h2 className="text-base font-semibold text-gray-800">Interaction History</h2>
          </div>
          <p className="text-sm text-gray-500">
            Full audit trail of all HCP interactions with search, filter, and export.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary gap-2">
            <FilterIcon size={14} /> Saved Filters
          </button>
          <button className="btn-primary gap-2">
            <DownloadIcon size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Full Table */}
      <InteractionTable compact={false} />
    </div>
  )
}

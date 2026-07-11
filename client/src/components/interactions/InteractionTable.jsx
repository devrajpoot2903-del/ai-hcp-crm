import { useState, useMemo } from 'react'
import useAppSelector from '../../hooks/useAppSelector'
import useAppDispatch from '../../hooks/useAppDispatch'
import { setFilters, clearFilters, setPage, setSelectedInteraction } from '../../redux/slices/interactionSlice'
import { openModal, addToast } from '../../redux/slices/uiSlice'
import { OutcomeBadge, PriorityBadge, StatusBadge, TypeBadge } from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import Modal from '../ui/Modal'
import { SearchIcon, FilterIcon, EyeIcon, TrashIcon, ChevronLeft, ChevronRight, XIcon, DownloadIcon } from '../ui/Icons'
import { useNavigate } from 'react-router-dom'

const COLUMNS = ['Date', 'HCP', 'Type', 'Topic', 'Priority', 'Status', 'Outcome', 'Actions']

function FilterBar({ filters, onFilter, onClear }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100 bg-gray-50">
      {/* Search */}
      <div className="relative flex-1">
        <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={e => onFilter({ search: e.target.value })}
          placeholder="Search by HCP name or topic…"
          className="form-input pl-9 py-2"
        />
      </div>

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={e => onFilter({ type: e.target.value })}
        className="form-select py-2 w-full sm:w-36"
      >
        <option value="all">All Types</option>
        {['Meeting','Call','Email','Conference','Visit'].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* Outcome filter */}
      <select
        value={filters.outcome}
        onChange={e => onFilter({ outcome: e.target.value })}
        className="form-select py-2 w-full sm:w-36"
      >
        <option value="all">All Outcomes</option>
        {['Successful','Neutral','Unsuccessful'].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>

      {/* Priority filter */}
      <select
        value={filters.priority}
        onChange={e => onFilter({ priority: e.target.value })}
        className="form-select py-2 w-full sm:w-32"
      >
        <option value="all">All Priority</option>
        {['High','Medium','Low'].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Clear button */}
      {(filters.search || filters.type !== 'all' || filters.outcome !== 'all' || filters.priority !== 'all') && (
        <button onClick={onClear} className="btn-ghost gap-1.5 whitespace-nowrap">
          <XIcon size={13} /> Clear
        </button>
      )}
    </div>
  )
}

function ViewModal({ interaction, onClose }) {
  if (!interaction) return null
  const rows = [
    ['HCP', interaction.hcpName],
    ['Specialty', interaction.hcpSpecialty],
    ['Type', interaction.interactionType],
    ['Date', interaction.date],
    ['Time', interaction.time],
    ['Duration', interaction.duration ? `${interaction.duration} min` : '—'],
    ['Topic', interaction.topic],
    ['Priority', interaction.priority],
    ['Outcome', interaction.outcome],
    ['Follow-up Required', interaction.followUpRequired ? 'Yes' : 'No'],
    ['Next Action', interaction.nextAction || '—'],
  ]
  return (
    <Modal title="Interaction Details" onClose={onClose}>
      <div className="space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span className="text-xs font-medium text-gray-500 w-36 flex-shrink-0">{k}</span>
            <span className="text-sm text-gray-800">{v}</span>
          </div>
        ))}
        {interaction.summary && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Summary</p>
            <p className="text-sm text-gray-700 leading-relaxed">{interaction.summary}</p>
          </div>
        )}
        {interaction.keyTakeaways && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Key Takeaways</p>
            <p className="text-sm text-gray-700 leading-relaxed">{interaction.keyTakeaways}</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default function InteractionTable({ compact = false }) {
  const dispatch   = useAppDispatch()
  const navigate   = useNavigate()
  const { interactions, filters, pagination } = useAppSelector(s => s.interaction)
  const [viewItem, setViewItem] = useState(null)

  const onFilter = (patch) => dispatch(setFilters(patch))
  const onClear  = () => dispatch(clearFilters())

  // Client-side filter + paginate
  const filtered = useMemo(() => {
    let list = [...interactions]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(i =>
        i.hcpName.toLowerCase().includes(q) ||
        i.topic.toLowerCase().includes(q)
      )
    }
    if (filters.type    !== 'all') list = list.filter(i => i.interactionType === filters.type)
    if (filters.outcome !== 'all') list = list.filter(i => i.outcome === filters.outcome)
    if (filters.priority!== 'all') list = list.filter(i => i.priority === filters.priority)
    return list
  }, [interactions, filters])

  const totalPages = Math.ceil(filtered.length / pagination.limit) || 1
  const pageStart  = (pagination.page - 1) * pagination.limit
  const paged      = filtered.slice(pageStart, pageStart + pagination.limit)

  const handleView = (item) => {
    dispatch(setSelectedInteraction(item))
    setViewItem(item)
  }

  const handleDelete = (item) => {
    dispatch(addToast({ type: 'info', message: `Delete feature will be wired to the backend API.` }))
  }

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Interaction Log</h2>
          <p className="text-xs text-gray-400 mt-0.5">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/interactions')}
            className="btn-primary btn-sm hidden sm:flex"
          >
            + Log New
          </button>
          <button className="btn-secondary btn-sm gap-1.5">
            <DownloadIcon size={13} /> Export
          </button>
        </div>
      </div>

      {/* Filters — only on full table */}
      {!compact && (
        <FilterBar filters={filters} onFilter={onFilter} onClear={onClear} />
      )}

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>HCP</th>
              <th>Type</th>
              {!compact && <th>Topic</th>}
              <th>Priority</th>
              {!compact && <th>Status</th>}
              <th>Outcome</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={compact ? 6 : 8} className="py-0">
                  <EmptyState type="noResults" />
                </td>
              </tr>
            ) : (
              paged.map(item => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-600">{item.date}</span>
                  </td>
                  <td>
                    <p className="text-sm font-medium text-gray-900">{item.hcpName}</p>
                    <p className="text-xs text-gray-400">{item.hcpSpecialty}</p>
                  </td>
                  <td><TypeBadge type={item.interactionType} /></td>
                  {!compact && (
                    <td>
                      <p className="text-sm text-gray-700 max-w-[180px] truncate" title={item.topic}>{item.topic}</p>
                    </td>
                  )}
                  <td><PriorityBadge priority={item.priority} /></td>
                  {!compact && <td><StatusBadge status={item.status} /></td>}
                  <td><OutcomeBadge outcome={item.outcome} /></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleView(item)}
                        className="btn-ghost p-1.5 rounded-lg text-gray-500 hover:text-blue-600"
                        title="View details"
                      >
                        <EyeIcon size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn-ghost p-1.5 rounded-lg text-gray-500 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!compact && filtered.length > pagination.limit && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {pageStart + 1}–{Math.min(pageStart + pagination.limit, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(setPage(pagination.page - 1))}
              disabled={pagination.page === 1}
              className="btn-ghost p-1.5 rounded-lg disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => dispatch(setPage(p))}
                className={`w-7 h-7 text-xs rounded-lg font-medium transition-all ${
                  p === pagination.page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => dispatch(setPage(pagination.page + 1))}
              disabled={pagination.page === totalPages}
              className="btn-ghost p-1.5 rounded-lg disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* View detail modal */}
      {viewItem && <ViewModal interaction={viewItem} onClose={() => setViewItem(null)} />}
    </div>
  )
}

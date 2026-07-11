import { useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon, XIcon } from './Icons'

/**
 * Searchable dropdown select component.
 *
 * @param {{
 *   options: {id:string, name:string, subtitle?:string}[],
 *   value: string,
 *   onChange: (option:{id,name,subtitle?}) => void,
 *   placeholder?: string,
 *   label?: string,
 *   error?: string,
 *   disabled?: boolean,
 * }} props
 */
export default function SearchableSelect({
  options = [],
  value = '',
  onChange,
  placeholder = 'Search and select…',
  label,
  error,
  disabled = false,
}) {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const containerRef          = useRef(null)
  const inputRef              = useRef(null)

  const selected = options.find(o => o.id === value || o.name === value)

  const filtered = query
    ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()) ||
                         (o.subtitle || '').toLowerCase().includes(query.toLowerCase()))
    : options

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = () => {
    if (disabled) return
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSelect = (opt) => {
    onChange(opt)
    setOpen(false)
    setQuery('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {label && <label className="form-label">{label}</label>}

      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={disabled}
        className={`form-input text-left flex items-center justify-between cursor-pointer ${
          error ? 'border-red-400 focus:ring-red-400' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.name : placeholder}
        </span>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {selected && (
            <span onClick={handleClear} className="text-gray-400 hover:text-gray-600 p-0.5">
              <XIcon size={12} />
            </span>
          )}
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-30 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl animate-fade-in overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search HCP…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Options */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
            ) : (
              filtered.map(opt => (
                <li
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selected?.id === opt.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium">{opt.name}</p>
                  {opt.subtitle && <p className="text-xs text-gray-400 mt-0.5">{opt.subtitle}</p>}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

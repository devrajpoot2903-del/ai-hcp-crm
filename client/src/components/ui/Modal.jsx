import { useEffect } from 'react'
import { XIcon } from './Icons'
import useAppDispatch from '../../hooks/useAppDispatch'
import { closeModal } from '../../redux/slices/uiSlice'

export default function Modal({ title, children, onConfirm, confirmLabel = 'Confirm', confirmVariant = 'primary', onClose }) {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    if (onClose) onClose()
    else dispatch(closeModal())
  }

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const btnClass = confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button onClick={handleClose} className="btn-ghost btn-sm rounded-lg p-1.5">
            <XIcon size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5">{children}</div>
        {/* Footer */}
        {onConfirm && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button onClick={handleClose} className="btn-secondary">Cancel</button>
            <button onClick={onConfirm} className={btnClass}>{confirmLabel}</button>
          </div>
        )}
      </div>
    </div>
  )
}

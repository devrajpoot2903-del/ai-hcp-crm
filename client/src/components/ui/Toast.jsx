import { useEffect } from 'react'
import { CheckCircle, XCircle, InfoIcon, XIcon } from './Icons'
import { removeToast } from '../../redux/slices/uiSlice'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'

const CONFIG = {
  success: { icon: CheckCircle, bar: 'bg-green-500',  bg: 'bg-green-50  border-green-200', text: 'text-green-800' },
  error:   { icon: XCircle,     bar: 'bg-red-500',    bg: 'bg-red-50    border-red-200',   text: 'text-red-800'   },
  warning: { icon: InfoIcon,    bar: 'bg-yellow-500', bg: 'bg-yellow-50 border-yellow-200',text: 'text-yellow-800'},
  info:    { icon: InfoIcon,    bar: 'bg-blue-500',   bg: 'bg-blue-50   border-blue-200',  text: 'text-blue-800'  },
}

function Toast({ toast }) {
  const dispatch = useAppDispatch()
  const { icon: Icon, bar, bg, text } = CONFIG[toast.type] || CONFIG.info

  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(toast.id)), toast.duration)
    return () => clearTimeout(t)
  }, [toast.id, toast.duration, dispatch])

  return (
    <div className={`flex items-start gap-3 min-w-72 max-w-sm px-4 py-3 rounded-xl border shadow-lg animate-slide-in ${bg}`}>
      <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${bar}`} />
      <Icon size={16} className={`mt-0.5 flex-shrink-0 ${text}`} />
      <p className={`text-sm font-medium flex-1 ${text}`}>{toast.message}</p>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className={`flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity ${text}`}
      >
        <XIcon size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useAppSelector(s => s.ui.toasts)

  if (!toasts.length) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>
  )
}

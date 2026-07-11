import InteractionForm from '../components/interactions/InteractionForm'
import ChatPanel from '../components/chat/ChatPanel'
import { SparklesIcon, ClipboardIcon } from '../components/ui/Icons'

export default function InteractionPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <ClipboardIcon size={16} className="text-blue-600" />
            <h2 className="text-base font-semibold text-gray-800">Log Interaction</h2>
          </div>
          <p className="text-sm text-gray-500">
            Record a new HCP interaction and get AI-powered insights in real time.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100">
          <SparklesIcon size={14} />
          <span className="text-xs font-semibold">AI Assistant Active</span>
        </div>
      </div>

      {/* Split layout: Form (left) + Chat (right) */}
      <div className="flex flex-col xl:flex-row gap-5 items-start">
        {/* Interaction Form — 60% */}
        <div className="flex-1 w-full min-w-0">
          <InteractionForm />
        </div>

        {/* AI Chat Panel — 40% */}
        <div className="xl:w-96 w-full flex-shrink-0 xl:sticky xl:top-20" style={{ height: '82vh' }}>
          <ChatPanel />
        </div>
      </div>
    </div>
  )
}

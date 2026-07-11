import { useState, useRef, useEffect } from 'react'
import { BotIcon, SendIcon, SparklesIcon, XIcon, RefreshIcon } from '../ui/Icons'
import { Spinner } from '../ui/Loader'

const SUGGESTIONS = [
  { id: 'summarize',    label: '✦ Summarize Interaction',   prompt: 'Please summarize this interaction for me.'                  },
  { id: 'followup',     label: '→ Generate Follow-up',      prompt: 'Generate a professional follow-up email for this interaction.' },
  { id: 'nextstep',     label: '⟳ Suggest Next Step',       prompt: 'What is the recommended next step for this HCP?'             },
  { id: 'actionitems',  label: '✓ Extract Action Items',    prompt: 'Extract all action items from the interaction notes.'         },
  { id: 'email',        label: '✉ Generate Email',          prompt: 'Draft a personalized outreach email for this HCP.'            },
]

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hello! I\'m your AI HCP assistant powered by LangGraph. I can help you summarize interactions, draft follow-up emails, suggest next steps, and extract action items.\n\nTry one of the suggestions below or type your question.',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
        isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-500 to-blue-600'
      }`}>
        {isUser
          ? <span className="text-[10px] font-bold text-white">You</span>
          : <BotIcon size={13} className="text-white" />
        }
      </div>
      {/* Bubble */}
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        }`}>
          {msg.loading ? (
            <div className="flex items-center gap-2">
              <Spinner size={12} className="text-gray-500" />
              <span className="text-gray-400 text-xs">Thinking…</span>
            </div>
          ) : msg.content}
        </div>
        <p className="text-[10px] text-gray-400 px-1">{msg.timestamp}</p>
      </div>
    </div>
  )
}

export default function ChatPanel() {
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)
  const inputRef                = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const sendMessage = (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return

    const userMsg = { id: Date.now(), role: 'user', content: msg, timestamp: now() }
    const thinkingMsg = { id: Date.now() + 1, role: 'assistant', content: '', loading: true, timestamp: '' }

    setMessages(prev => [...prev, userMsg, thinkingMsg])
    setInput('')
    setLoading(true)

    // Placeholder — replace with aiAPI.chat({ query: msg }) when backend is ready
    setTimeout(() => {
      const aiResponse = `[AI Placeholder] Your query: "${msg}"\n\nThis response will come from the LangGraph HCP CRM agent via the FastAPI backend. Connect the Groq API key and the agent will generate intelligent, context-aware responses here.`
      setMessages(prev => [
        ...prev.slice(0, -1),
        { id: Date.now(), role: 'assistant', content: aiResponse, timestamp: now() },
      ])
      setLoading(false)
      inputRef.current?.focus()
    }, 1200)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMessages([WELCOME_MSG])

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <SparklesIcon size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">AI Assistant</p>
            <p className="text-[10px] text-gray-400">Powered by LangGraph · Groq</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Ready
          </span>
          <button onClick={clearChat} className="btn-ghost p-1.5 rounded-lg ml-1" title="Clear chat">
            <RefreshIcon size={13} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg => <Message key={msg.id} msg={msg} />)}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-3 py-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 font-medium mb-2">Quick Actions</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => sendMessage(s.prompt)}
              disabled={loading}
              className="text-[11px] px-2.5 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-lg font-medium transition-all duration-150 disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all p-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about this HCP or interaction…"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none min-h-[32px] max-h-24 py-1 px-1"
            style={{ height: 'auto' }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner size={12} className="text-white" /> : <SendIcon size={13} />}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

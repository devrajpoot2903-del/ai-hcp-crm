import { useState } from 'react'
import { addToast } from '../redux/slices/uiSlice'
import useAppDispatch from '../hooks/useAppDispatch'
import { SettingsIcon, UserIcon, BellIcon, SparklesIcon, BuildingIcon, CheckCircle } from '../components/ui/Icons'

function Section({ title, description, children }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </button>
  )
}

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    followUpReminders:  true,
    aiSuggestions:      true,
    weeklyDigest:       false,
    darkMode:           false,
  })

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const handleSave = () => {
    dispatch(addToast({ type: 'success', message: 'Settings saved successfully!' }))
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <SettingsIcon size={16} className="text-blue-600" />
          <h2 className="text-base font-semibold text-gray-800">Settings</h2>
        </div>
        <p className="text-sm text-gray-500">Manage your account, preferences, and AI integration settings.</p>
      </div>

      {/* Profile */}
      <Section title="Profile Information" description="Your account and territory details">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
            <UserIcon size={24} className="text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">Sales Representative</p>
            <p className="text-sm text-gray-500">Medical Affairs · Northeast Territory</p>
            <p className="text-xs text-blue-600 font-medium mt-1">rep@pharma-company.com</p>
          </div>
        </div>
        <SettingRow label="Full Name">
          <input defaultValue="Sales Representative" className="form-input w-64" />
        </SettingRow>
        <SettingRow label="Territory">
          <input defaultValue="Northeast Territory" className="form-input w-64" />
        </SettingRow>
        <SettingRow label="Department">
          <input defaultValue="Medical Affairs" className="form-input w-64" />
        </SettingRow>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences" description="Control how and when you receive alerts">
        <SettingRow label="Email Notifications" description="Receive interaction summaries via email">
          <Toggle enabled={prefs.emailNotifications} onToggle={() => toggle('emailNotifications')} />
        </SettingRow>
        <SettingRow label="Follow-up Reminders" description="Get reminders for pending follow-up tasks">
          <Toggle enabled={prefs.followUpReminders} onToggle={() => toggle('followUpReminders')} />
        </SettingRow>
        <SettingRow label="Weekly Digest" description="Weekly summary of your HCP engagement activity">
          <Toggle enabled={prefs.weeklyDigest} onToggle={() => toggle('weeklyDigest')} />
        </SettingRow>
      </Section>

      {/* AI Settings */}
      <Section title="AI & Integration Settings" description="Configure the LangGraph AI assistant">
        <SettingRow label="AI Suggestions" description="Show AI-generated suggestions in the interaction form">
          <Toggle enabled={prefs.aiSuggestions} onToggle={() => toggle('aiSuggestions')} />
        </SettingRow>
        <SettingRow label="Groq API Key" description="Required for the LangGraph AI agent">
          <div className="flex gap-2 items-center">
            <input
              type="password"
              defaultValue=""
              placeholder="gsk_••••••••••••••••"
              className="form-input w-52"
            />
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <BuildingIcon size={12} />
              Placeholder
            </span>
          </div>
        </SettingRow>
        <SettingRow label="LangGraph Model" description="AI model used for the HCP CRM agent">
          <select className="form-select w-52">
            <option>llama3-70b-8192</option>
            <option>llama3-8b-8192</option>
            <option>mixtral-8x7b-32768</option>
          </select>
        </SettingRow>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <SparklesIcon size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">AI Integration Status</p>
            <p className="text-xs text-blue-600 mt-0.5">
              Add your Groq API key and configure the backend <code className="bg-blue-100 px-1 rounded">.env</code> file
              to activate the full AI assistant. The LangGraph agent will then provide intelligent HCP insights.
            </p>
          </div>
        </div>
      </Section>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <button className="btn-secondary">Discard Changes</button>
        <button onClick={handleSave} className="btn-primary gap-2">
          <CheckCircle size={15} /> Save Settings
        </button>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import {
  setFormField, resetForm,
  submitInteractionStart, submitInteractionSuccess, submitInteractionFailure,
} from '../../redux/slices/interactionSlice'
import { addToast } from '../../redux/slices/uiSlice'
import SearchableSelect from '../ui/SearchableSelect'
import { Spinner } from '../ui/Loader'
import { CheckCircle, RefreshIcon } from '../ui/Icons'

const INTERACTION_TYPES = ['Meeting', 'Call', 'Email', 'Conference', 'Visit']
const PRIORITIES        = ['Low', 'Medium', 'High']
const OUTCOMES          = ['Successful', 'Neutral', 'Unsuccessful']

function FieldRow({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

function Field({ label, required, children, error }) {
  return (
    <div>
      <label className="form-label">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default function InteractionForm() {
  const dispatch    = useAppDispatch()
  const { formData, hcpList, isSubmitting, submitSuccess, error } = useAppSelector(s => s.interaction)

  // Map HCP list to searchable select options
  const hcpOptions = hcpList.map(h => ({
    id: h.id, name: h.name, subtitle: `${h.specialty} · ${h.hospital}`,
  }))

  // Show toast on success/error
  useEffect(() => {
    if (submitSuccess) {
      dispatch(addToast({ type: 'success', message: 'Interaction logged successfully!' }))
    }
  }, [submitSuccess, dispatch])

  useEffect(() => {
    if (error) {
      dispatch(addToast({ type: 'error', message: error }))
    }
  }, [error, dispatch])

  const set = (field, value) => dispatch(setFormField({ field, value }))

  const handleHCPSelect = (opt) => {
    if (opt) { set('hcpName', opt.name); set('hcpId', opt.id) }
    else      { set('hcpName', '');      set('hcpId', null) }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.hcpName) {
      dispatch(addToast({ type: 'error', message: 'Please select an HCP before saving.' }))
      return
    }
    if (!formData.date) {
      dispatch(addToast({ type: 'error', message: 'Please enter the interaction date.' }))
      return
    }

    dispatch(submitInteractionStart())
    // Placeholder — replace with real API call:
    // interactionAPI.create(formData).then(...).catch(...)
    setTimeout(() => {
      dispatch(submitInteractionSuccess({ ...formData }))
    }, 800)
  }

  const handleReset = () => {
    dispatch(resetForm())
    dispatch(addToast({ type: 'info', message: 'Form cleared.' }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Section: HCP & Type */}
      <section className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          HCP & Interaction Details
        </h2>
        <div className="space-y-4">
          <Field label="HCP Name" required>
            <SearchableSelect
              options={hcpOptions}
              value={formData.hcpId}
              onChange={handleHCPSelect}
              placeholder="Search healthcare provider…"
            />
          </Field>

          <FieldRow>
            <Field label="Interaction Type" required>
              <div className="flex flex-wrap gap-2 mt-1">
                {INTERACTION_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => set('interactionType', type)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 ${
                      formData.interactionType === type
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Priority" required>
              <div className="flex gap-2 mt-1">
                {PRIORITIES.map(p => {
                  const colors = { Low:'border-blue-400 bg-blue-600 text-white', Medium:'border-yellow-400 bg-yellow-500 text-white', High:'border-red-400 bg-red-600 text-white' }
                  const idle   = { Low:'text-blue-600 border-blue-300 hover:border-blue-400', Medium:'text-yellow-600 border-yellow-300 hover:border-yellow-400', High:'text-red-600 border-red-300 hover:border-red-400' }
                  const active = formData.priority === p
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => set('priority', p)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 ${
                        active ? colors[p] : `bg-white ${idle[p]}`
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </Field>
          </FieldRow>
        </div>
      </section>

      {/* Section: Date & Time */}
      <section className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Schedule
        </h2>
        <FieldRow>
          <Field label="Date" required>
            <input
              type="date"
              value={formData.date}
              onChange={e => set('date', e.target.value)}
              className="form-input"
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={formData.time}
              onChange={e => set('time', e.target.value)}
              className="form-input"
            />
          </Field>
        </FieldRow>
        <div className="mt-4">
          <Field label="Duration (minutes)">
            <input
              type="number"
              min="1"
              max="480"
              value={formData.duration}
              onChange={e => set('duration', e.target.value)}
              placeholder="e.g. 45"
              className="form-input"
            />
          </Field>
        </div>
      </section>

      {/* Section: Content */}
      <section className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Interaction Content
        </h2>
        <div className="space-y-4">
          <Field label="Topic Discussed" required>
            <input
              type="text"
              value={formData.topic}
              onChange={e => set('topic', e.target.value)}
              placeholder="e.g. Cardiology Research Update, Clinical Trial Results…"
              className="form-input"
            />
          </Field>
          <Field label="Summary Notes">
            <textarea
              rows={3}
              value={formData.summary}
              onChange={e => set('summary', e.target.value)}
              placeholder="Detailed notes on what was discussed during the interaction…"
              className="form-textarea"
            />
          </Field>
          <Field label="Key Takeaways">
            <textarea
              rows={2}
              value={formData.keyTakeaways}
              onChange={e => set('keyTakeaways', e.target.value)}
              placeholder="Key points, decisions, or insights from the interaction…"
              className="form-textarea"
            />
          </Field>
        </div>
      </section>

      {/* Section: Outcome */}
      <section className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Outcome & Next Steps
        </h2>
        <div className="space-y-4">
          <Field label="Outcome" required>
            <div className="flex gap-2 mt-1">
              {OUTCOMES.map(o => {
                const colors = { Successful:'bg-green-600 text-white border-green-600', Neutral:'bg-yellow-500 text-white border-yellow-500', Unsuccessful:'bg-red-600 text-white border-red-600' }
                const idle   = { Successful:'text-green-600 border-green-300 hover:border-green-500', Neutral:'text-yellow-600 border-yellow-300 hover:border-yellow-500', Unsuccessful:'text-red-600 border-red-300 hover:border-red-500' }
                const active = formData.outcome === o
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => set('outcome', o)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 ${
                      active ? colors[o] : `bg-white ${idle[o]}`
                    }`}
                  >
                    {o}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Next Action">
            <input
              type="text"
              value={formData.nextAction}
              onChange={e => set('nextAction', e.target.value)}
              placeholder="e.g. Send clinical data report, Schedule site visit…"
              className="form-input"
            />
          </Field>

          {/* Follow-up checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.followUpRequired}
                onChange={e => set('followUpRequired', e.target.checked)}
                className="sr-only peer"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                formData.followUpRequired
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {formData.followUpRequired && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Follow-up Required</p>
              <p className="text-xs text-gray-400">Mark this interaction as needing a follow-up action</p>
            </div>
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button type="button" onClick={handleReset} className="btn-secondary gap-2">
          <RefreshIcon size={14} />
          Reset Form
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-primary px-8">
          {isSubmitting ? (
            <><Spinner size={14} className="text-white" /> Saving…</>
          ) : (
            <><CheckCircle size={16} /> Save Interaction</>
          )}
        </button>
      </div>
    </form>
  )
}

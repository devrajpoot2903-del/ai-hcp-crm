import { createSlice } from '@reduxjs/toolkit'

// ── Sample HCP Master List ──────────────────────────────
export const HCP_LIST = [
  { id: 'hcp-1', name: 'Dr. Sarah Johnson',   specialty: 'Cardiologist',       hospital: 'City Medical Center'           },
  { id: 'hcp-2', name: 'Dr. Michael Chen',    specialty: 'Oncologist',         hospital: 'Regional Cancer Institute'     },
  { id: 'hcp-3', name: 'Dr. Emily Rodriguez', specialty: 'Neurologist',        hospital: 'Metro Neurology Clinic'        },
  { id: 'hcp-4', name: 'Dr. James Wilson',    specialty: 'Endocrinologist',    hospital: 'Diabetes & Hormone Care'       },
  { id: 'hcp-5', name: 'Dr. Priya Patel',     specialty: 'Rheumatologist',     hospital: 'Arthritis & Rheum Associates'  },
  { id: 'hcp-6', name: 'Dr. Robert Martinez', specialty: 'Pulmonologist',      hospital: 'Lung Health Institute'         },
  { id: 'hcp-7', name: 'Dr. Lisa Thompson',   specialty: 'Gastroenterologist', hospital: 'GI Specialists of America'     },
  { id: 'hcp-8', name: 'Dr. David Kim',       specialty: 'Cardiologist',       hospital: 'Heart & Vascular Center'      },
  { id: 'hcp-9', name: 'Dr. Angela Brown',    specialty: 'Dermatologist',      hospital: 'Advanced Dermatology Group'   },
  { id: 'hcp-10',name: 'Dr. Kevin Nguyen',    specialty: 'Psychiatrist',       hospital: 'Mind & Wellness Clinic'       },
]

// ── Sample Interaction History ──────────────────────────
const SAMPLE_INTERACTIONS = [
  {
    id: 'int-1',
    hcpName: 'Dr. Sarah Johnson', hcpSpecialty: 'Cardiologist',
    interactionType: 'Meeting', date: '2024-01-15', time: '10:00', duration: '45',
    topic: 'Cardiology Research Update',
    summary: 'Discussed latest cardiovascular research and product efficacy data from recent trials.',
    keyTakeaways: 'Dr. Johnson is interested in scheduling a follow-up to review the clinical trial details.',
    followUpRequired: true, priority: 'High', outcome: 'Successful',
    nextAction: 'Send clinical trial data report by EOW', status: 'Completed',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'int-2',
    hcpName: 'Dr. Michael Chen', hcpSpecialty: 'Oncologist',
    interactionType: 'Call', date: '2024-01-14', time: '14:30', duration: '30',
    topic: 'Clinical Trial Phase 3 Results',
    summary: 'Reviewed Phase 3 trial results for the oncology drug pipeline. Positive reception.',
    keyTakeaways: 'Will consider enrolling patients if safety profile confirms. Needs full data packet.',
    followUpRequired: true, priority: 'High', outcome: 'Successful',
    nextAction: 'Schedule site visit Q1', status: 'Completed',
    createdAt: '2024-01-14T14:30:00Z',
  },
  {
    id: 'int-3',
    hcpName: 'Dr. Emily Rodriguez', hcpSpecialty: 'Neurologist',
    interactionType: 'Email', date: '2024-01-13', time: '09:15', duration: '15',
    topic: 'Product Information Request',
    summary: 'Responded to product efficacy and dosage information request from Dr. Rodriguez.',
    keyTakeaways: 'Needs drug interaction fact sheet. Concern about patients on multiple medications.',
    followUpRequired: false, priority: 'Low', outcome: 'Neutral',
    nextAction: 'Send drug interaction fact sheet', status: 'Completed',
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: 'int-4',
    hcpName: 'Dr. James Wilson', hcpSpecialty: 'Endocrinologist',
    interactionType: 'Visit', date: '2024-01-12', time: '11:00', duration: '60',
    topic: 'Diabetes Management Protocol',
    summary: 'Presented new diabetes management protocol and product integration strategy.',
    keyTakeaways: 'Open to trialing new protocol with select patients next quarter.',
    followUpRequired: true, priority: 'Medium', outcome: 'Successful',
    nextAction: 'Provide patient starter kits', status: 'Pending',
    createdAt: '2024-01-12T11:00:00Z',
  },
  {
    id: 'int-5',
    hcpName: 'Dr. Priya Patel', hcpSpecialty: 'Rheumatologist',
    interactionType: 'Conference', date: '2024-01-10', time: '09:00', duration: '120',
    topic: 'Annual Rheumatology Symposium',
    summary: 'Met at the annual conference. Discussed inflammatory disease treatment landscape.',
    keyTakeaways: 'Interested in comparative studies vs. competitor biologics.',
    followUpRequired: true, priority: 'Medium', outcome: 'Neutral',
    nextAction: 'Send comparative efficacy study', status: 'Completed',
    createdAt: '2024-01-10T09:00:00Z',
  },
  {
    id: 'int-6',
    hcpName: 'Dr. Robert Martinez', hcpSpecialty: 'Pulmonologist',
    interactionType: 'Call', date: '2024-01-08', time: '15:00', duration: '20',
    topic: 'COPD Treatment Options',
    summary: 'Brief call to discuss new COPD treatment options and formulary status.',
    keyTakeaways: 'Requested CME materials on COPD management guidelines.',
    followUpRequired: false, priority: 'Low', outcome: 'Neutral',
    nextAction: 'Send CME accreditation link', status: 'Completed',
    createdAt: '2024-01-08T15:00:00Z',
  },
  {
    id: 'int-7',
    hcpName: 'Dr. David Kim', hcpSpecialty: 'Cardiologist',
    interactionType: 'Meeting', date: '2024-01-05', time: '13:00', duration: '45',
    topic: 'Heart Failure Management',
    summary: 'Detailed discussion on heart failure patient management protocol with new therapy.',
    keyTakeaways: 'Very receptive. Wants to co-present at a local cardiology conference.',
    followUpRequired: true, priority: 'High', outcome: 'Successful',
    nextAction: 'Coordinate conference logistics', status: 'Pending',
    createdAt: '2024-01-05T13:00:00Z',
  },
]

const BLANK_FORM = {
  hcpName: '',
  hcpId: null,
  interactionType: 'Meeting',
  date: '',
  time: '',
  duration: '',
  topic: '',
  summary: '',
  keyTakeaways: '',
  followUpRequired: false,
  priority: 'Medium',
  outcome: 'Neutral',
  nextAction: '',
}

const initialState = {
  interactions: SAMPLE_INTERACTIONS,
  hcpList: HCP_LIST,
  selectedInteraction: null,
  formData: { ...BLANK_FORM },
  filters: { search: '', type: 'all', outcome: 'all', priority: 'all' },
  pagination: { page: 1, limit: 10, total: SAMPLE_INTERACTIONS.length },
  isLoading: false,
  isSubmitting: false,
  error: null,
  submitSuccess: false,
}

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setFormField(state, action) {
      const { field, value } = action.payload
      state.formData[field] = value
      state.submitSuccess = false
    },
    resetForm(state) {
      state.formData = { ...BLANK_FORM }
      state.submitSuccess = false
      state.error = null
    },
    submitInteractionStart(state) {
      state.isSubmitting = true
      state.error = null
      state.submitSuccess = false
    },
    submitInteractionSuccess(state, action) {
      state.isSubmitting = false
      state.submitSuccess = true
      const newEntry = {
        ...action.payload,
        id: `int-${Date.now()}`,
        status: action.payload.followUpRequired ? 'Pending' : 'Completed',
        createdAt: new Date().toISOString(),
        hcpSpecialty: HCP_LIST.find(h => h.id === action.payload.hcpId)?.specialty || '',
      }
      state.interactions.unshift(newEntry)
      state.pagination.total = state.interactions.length
      state.formData = { ...BLANK_FORM }
    },
    submitInteractionFailure(state, action) {
      state.isSubmitting = false
      state.error = action.payload
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1
    },
    clearFilters(state) {
      state.filters = { search: '', type: 'all', outcome: 'all', priority: 'all' }
      state.pagination.page = 1
    },
    setPage(state, action) {
      state.pagination.page = action.payload
    },
    setSelectedInteraction(state, action) {
      state.selectedInteraction = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearSubmitSuccess(state) {
      state.submitSuccess = false
    },
    deleteInteraction(state, action) {
      state.interactions = state.interactions.filter(i => i.id !== action.payload)
      state.pagination.total = state.interactions.length
    },
  },
})

export const {
  setFormField,
  resetForm,
  submitInteractionStart,
  submitInteractionSuccess,
  submitInteractionFailure,
  setFilters,
  clearFilters,
  setPage,
  setSelectedInteraction,
  setLoading,
  setError,
  clearSubmitSuccess,
  deleteInteraction,
} = interactionSlice.actions

export default interactionSlice.reducer

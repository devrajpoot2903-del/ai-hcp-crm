import { createSlice } from '@reduxjs/toolkit'

const RECENT_ACTIVITY = [
  { id: 1, hcp: 'Dr. Sarah Johnson', specialty: 'Cardiologist', type: 'Meeting',    time: '2 hours ago',  outcome: 'Successful', topic: 'Cardiology Research Update',       priority: 'High'   },
  { id: 2, hcp: 'Dr. Michael Chen',  specialty: 'Oncologist',   type: 'Call',       time: '4 hours ago',  outcome: 'Successful', topic: 'Clinical Trial Phase 3 Results',   priority: 'High'   },
  { id: 3, hcp: 'Dr. Emily Rodriguez',specialty:'Neurologist',  type: 'Email',      time: 'Yesterday',    outcome: 'Neutral',    topic: 'Product Information Request',      priority: 'Low'    },
  { id: 4, hcp: 'Dr. James Wilson',  specialty: 'Endocrinologist',type:'Visit',     time: 'Yesterday',    outcome: 'Successful', topic: 'Diabetes Management Protocol',     priority: 'Medium' },
  { id: 5, hcp: 'Dr. Priya Patel',   specialty: 'Rheumatologist',type: 'Conference',time: '2 days ago',   outcome: 'Neutral',    topic: 'Annual Rheumatology Symposium',    priority: 'Medium' },
]

const initialState = {
  stats: {
    totalHCPs:          248,
    todayInteractions:   12,
    pendingFollowUps:    34,
    thisWeekMeetings:     8,
  },
  recentActivity: RECENT_ACTIVITY,
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchDashboardSuccess(state, action) {
      state.isLoading = false
      state.stats = action.payload.stats
      state.recentActivity = action.payload.recentActivity
    },
    fetchDashboardFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    setStats(state, action) {
      state.stats = action.payload
    },
    setRecentActivity(state, action) {
      state.recentActivity = action.payload
    },
  },
})

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  setStats,
  setRecentActivity,
} = dashboardSlice.actions

export default dashboardSlice.reducer

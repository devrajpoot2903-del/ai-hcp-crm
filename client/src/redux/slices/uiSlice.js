import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: true,
  toasts: [],
  activeModal: null,
  pageTitle: 'Dashboard',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload
    },
    setPageTitle(state, action) {
      state.pageTitle = action.payload
    },
    addToast(state, action) {
      state.toasts.push({
        id: Date.now() + Math.random(),
        type: action.payload.type || 'info',   // 'success' | 'error' | 'warning' | 'info'
        message: action.payload.message,
        duration: action.payload.duration || 4000,
      })
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(t => t.id !== action.payload)
    },
    clearToasts(state) {
      state.toasts = []
    },
    openModal(state, action) {
      // action.payload = { type: 'VIEW_INTERACTION' | 'CONFIRM_DELETE', data: {...} }
      state.activeModal = action.payload
    },
    closeModal(state) {
      state.activeModal = null
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setPageTitle,
  addToast,
  removeToast,
  clearToasts,
  openModal,
  closeModal,
} = uiSlice.actions

export default uiSlice.reducer

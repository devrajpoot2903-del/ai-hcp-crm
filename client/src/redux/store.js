import { configureStore } from '@reduxjs/toolkit'
import appReducer         from './slices/appSlice'
import dashboardReducer   from './slices/dashboardSlice'
import interactionReducer from './slices/interactionSlice'
import uiReducer          from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    app:         appReducer,
    dashboard:   dashboardReducer,
    interaction: interactionReducer,
    ui:          uiReducer,
  },
})

export default store

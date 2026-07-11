/**
 * Dashboard API service — placeholder.
 */
import apiClient from '../apiClient'

const dashboardAPI = {
  getStats:         () => apiClient.get('/api/v1/dashboard/stats'),
  getRecentActivity:() => apiClient.get('/api/v1/dashboard/activity'),
}

export default dashboardAPI

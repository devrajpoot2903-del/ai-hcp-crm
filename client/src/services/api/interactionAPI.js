/**
 * Interaction API service — placeholder.
 * Replace function bodies with real apiClient calls when backend is ready.
 */
import apiClient from '../apiClient'

const interactionAPI = {
  /** Fetch paginated interaction list */
  getAll: (params) => apiClient.get('/api/v1/interactions/', { params }),

  /** Fetch single interaction by ID */
  getById: (id) => apiClient.get(`/api/v1/interactions/${id}`),

  /** Create new interaction */
  create: (payload) => apiClient.post('/api/v1/interactions/', payload),

  /** Update existing interaction */
  update: (id, payload) => apiClient.put(`/api/v1/interactions/${id}`, payload),

  /** Delete interaction */
  remove: (id) => apiClient.delete(`/api/v1/interactions/${id}`),
}

export default interactionAPI

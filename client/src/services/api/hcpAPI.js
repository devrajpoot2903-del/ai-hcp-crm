/**
 * HCP API service — placeholder.
 */
import apiClient from '../apiClient'

const hcpAPI = {
  getAll:   (params) => apiClient.get('/api/v1/hcp/', { params }),
  getById:  (id)     => apiClient.get(`/api/v1/hcp/${id}`),
  create:   (payload)=> apiClient.post('/api/v1/hcp/', payload),
  update:   (id, payload) => apiClient.put(`/api/v1/hcp/${id}`, payload),
  remove:   (id)     => apiClient.delete(`/api/v1/hcp/${id}`),
  search:   (query)  => apiClient.get('/api/v1/hcp/', { params: { search: query } }),
}

export default hcpAPI

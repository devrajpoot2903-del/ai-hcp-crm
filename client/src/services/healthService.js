import apiClient from './apiClient'

// Placeholder – expand per feature
const healthService = {
  check: () => apiClient.get('/health'),
}

export { healthService }

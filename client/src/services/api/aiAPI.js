/**
 * AI API service — placeholder.
 * Maps to LangGraph agent endpoints on the FastAPI backend.
 */
import apiClient from '../apiClient'

const aiAPI = {
  /** Send a chat message to the HCP CRM agent */
  chat: (payload) => apiClient.post('/api/v1/ai/chat', payload),

  /** Summarize interaction notes */
  summarizeInteraction: (interactionData) =>
    apiClient.post('/api/v1/ai/summarize', { interaction: interactionData }),

  /** Generate follow-up email draft */
  generateFollowUp: (interactionData) =>
    apiClient.post('/api/v1/ai/follow-up', { interaction: interactionData }),

  /** Suggest next best action */
  suggestNextStep: (hcpId, context) =>
    apiClient.post('/api/v1/ai/next-step', { hcp_id: hcpId, context }),

  /** Extract action items from notes */
  extractActionItems: (notes) =>
    apiClient.post('/api/v1/ai/action-items', { notes }),

  /** Generate outreach email */
  generateEmail: (hcpId, topic) =>
    apiClient.post('/api/v1/ai/generate-email', { hcp_id: hcpId, topic }),
}

export default aiAPI

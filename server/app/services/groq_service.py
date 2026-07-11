"""
Placeholder Groq service.

Wraps the Groq SDK client. Replace with real implementation when ready.
"""
from groq import Groq
from app.config.settings import settings


class GroqService:
    """Thin wrapper around the Groq SDK."""

    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL

    def chat(self, messages: list[dict], **kwargs) -> str:
        """
        Send a list of messages to the Groq LLM and return the text response.

        Args:
            messages: List of {role, content} dicts.

        Returns:
            Assistant message content string.
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            **kwargs,
        )
        return response.choices[0].message.content


# Singleton instance
groq_service = GroqService()

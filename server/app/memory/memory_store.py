"""
Placeholder agent memory module.

Will store conversation history per session using an in-memory store
or an external store (e.g., Redis, PostgreSQL) in production.
"""
from collections import defaultdict
from langchain_core.messages import BaseMessage


class InMemoryMemory:
    """Simple in-process conversation memory – for development only."""

    def __init__(self):
        self._store: dict[str, list[BaseMessage]] = defaultdict(list)

    def get(self, session_id: str) -> list[BaseMessage]:
        return self._store[session_id]

    def add(self, session_id: str, message: BaseMessage) -> None:
        self._store[session_id].append(message)

    def clear(self, session_id: str) -> None:
        self._store[session_id] = []


# Singleton memory store
memory_store = InMemoryMemory()

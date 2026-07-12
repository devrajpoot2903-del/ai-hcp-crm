# AI HCP CRM

AI-powered Healthcare Provider (HCP) CRM platform built with React, FastAPI, and LangGraph.

---

## Tech Stack

| Layer      | Technology                                       |
|------------|--------------------------------------------------|
| Frontend   | React 19, Vite, Redux Toolkit, React Router DOM, Tailwind CSS, Axios |
| Backend    | Python, FastAPI, LangGraph, SQLAlchemy, Pydantic, Uvicorn |
| AI         | Groq API, LangGraph Agents                       |
| Database   | PostgreSQL                                       |

---

## Folder Structure

```
ai-hcp-crm/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page-level components
│       ├── layouts/           # Layout wrappers
│       ├── redux/             # Redux Toolkit store & slices
│       ├── services/          # Axios API service layer
│       ├── hooks/             # Custom React hooks
│       ├── utils/             # Utility helpers
│       ├── styles/            # Global styles
│       └── assets/            # Static assets
├── server/                    # FastAPI backend
│   └── app/
│       ├── api/routers/       # Route definitions
│       ├── api/controllers/   # Request handlers
│       ├── services/          # Business logic
│       ├── langgraph/agents/  # LangGraph agent definitions
│       ├── langgraph/tools/   # LangGraph tools
│       ├── database/models/   # SQLAlchemy ORM models
│       ├── database/schemas/  # Pydantic schemas
│       ├── config/            # App configuration
│       ├── middlewares/       # FastAPI middlewares
│       ├── utils/             # Utility helpers
│       ├── prompts/           # LLM prompt templates
│       └── memory/            # Agent memory management
├── docs/                      # Project documentation
├── .env.example               # Environment variable template
├── .gitignore
└── README.md
```

---

## Features

- AI-powered HCP Assistant (Groq + LangGraph)
- HCP Interaction Management
- Dashboard Analytics
- CRUD Operations
- Search & Filtering
- AI Follow-up Email Generator
- AI Interaction Summarization
- Action Item Extraction
- PostgreSQL Database
- Responsive UI

  





## Future Scope

- Authentication
- Multi-user Support
- Calendar Integration
- Notifications
- Report Export
- Role Based Access






## Installation

### Prerequisites
- Node.js >= 18
- Python >= 3.11
- PostgreSQL

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

---

## Run Frontend

```bash
cd client
npm run dev
```

Runs on: http://localhost:5173

---

## Run Backend

```bash
cd server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs  
Health check: http://localhost:8000/health

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

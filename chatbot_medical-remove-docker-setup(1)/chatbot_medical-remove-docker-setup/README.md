# Chatbot Application (Without Docker)

This project contains a chatbot application with a FastAPI backend and a React frontend. This guide explains how to set up and run the application directly on your machine without using Docker.

## Overview

The application consists of two main parts:
*   **Backend:** A Python FastAPI application that handles chat logic and interfaces with Ollama.
*   **Frontend:** A React application (using Vite) that provides the user interface for the chatbot.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Python:** Version 3.12 or higher. (You can download it from [python.org](https://www.python.org/downloads/)).
*   **pip:** The Python package installer (usually comes with Python).
*   **Node.js:** Version 18 or higher. (You can download it from [nodejs.org](https://nodejs.org/)).
*   **npm:** The Node package manager (usually comes with Node.js).
*   **Ollama:** An instance of Ollama must be running and accessible. The backend defaults to connecting to `http://localhost:11434`. If your Ollama instance is elsewhere, you'll need to configure the backend accordingly (see backend setup). You can find Ollama at [ollama.ai](https://ollama.ai/).

## Setup and Running

You will need to set up and run the backend and frontend services separately. It's recommended to open two terminal windows or tabs for this.

### 1. Backend Setup (FastAPI)

Detailed instructions for the backend are in `backend_fastapi/README.md`. Here's a summary:

*   Navigate to the `backend_fastapi` directory.
*   Create a Python virtual environment and activate it.
*   Install dependencies: `pip install -r requirements.txt`
*   Set the `OLLAMA_HOST` environment variable if your Ollama instance is not at `http://localhost:11434`.
*   Run the backend: `uvicorn main:app --host 0.0.0.0 --port 8000` (or your chosen port, e.g., 8500).

The backend API will typically be available at `http://localhost:8000`.

### 2. Frontend Setup (React)

Detailed instructions for the frontend are in `frontend_react/README.md`. Here's a summary:

*   Navigate to the `frontend_react` directory.
*   Install dependencies: `npm install`
*   Run the frontend: `npm run dev`

The frontend application will typically be available at `http://localhost:5173`.

## Usage

Once both the backend and frontend are running:

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  You should see the chatbot interface and can start interacting with it.

The frontend is configured to communicate with the backend (by default, at `http://localhost:8000`). If you've changed the backend port, ensure the frontend's proxy configuration in `vite.config.ts` (if used) or API call URLs are updated accordingly. The current `vite.config.ts` proxies `/api` requests to `http://localhost:8000`.

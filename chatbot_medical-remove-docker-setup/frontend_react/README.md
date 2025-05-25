# Frontend Setup (Without Docker)

This guide explains how to run the React frontend application without Docker.

## Prerequisites

*   Node.js version 18 or higher
*   npm (Node package manager), which usually comes with Node.js

## Setup and Running

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>/frontend_react
    ```

2.  **Install dependencies:**
    Navigate to the `frontend_react` directory if you are not already there.
    ```bash
    npm install
    ```
    This will install all necessary packages defined in `package.json`, including `marked`, `dompurify`, and `@tailwindcss/typography` which were previously installed separately in the Dockerfile.

3.  **Run the application:**
    ```bash
    npm run dev
    ```
    This command will start the Vite development server. By default, it should be accessible at `http://localhost:5173`. If the port is already in use, Vite might suggest an alternative port.

## Backend Connection
The frontend application is configured to connect to a backend service. Ensure the backend is running and accessible to the frontend. The default backend URL is usually configured in `src/services/api.ts` or a similar configuration file (e.g., `VITE_API_BASE_URL` in an `.env` file if used).

For this project, the backend is expected to be running at `http://localhost:8000` (or the port you configured for the backend). If your backend runs on a different URL, you might need to adjust the proxy settings in `vite.config.ts` or the base URL in the API service configuration. The current `vite.config.ts` seems to proxy `/api` requests to `http://localhost:8000`.

# Backend Setup (Without Docker)

This guide explains how to run the FastAPI backend application without Docker.

## Prerequisites

*   Python 3.12 or higher
*   pip (Python package installer)
*   An instance of Ollama running. By default, the application will try to connect to `http://localhost:11434`.

## Setup and Running

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>/backend_fastapi
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```
    Activate the virtual environment:
    *   On Windows:
        ```bash
        .\venv\Scripts\activate
        ```
    *   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set the OLLAMA_HOST environment variable (if Ollama is not running on `http://localhost:11434`):**
    The application needs to know where Ollama is running.
    *   On Windows (PowerShell):
        ```powershell
        $env:OLLAMA_HOST="<your_ollama_url>"
        ```
        Example:
        ```powershell
        $env:OLLAMA_HOST="http://192.168.1.10:11434"
        ```
    *   On Windows (Command Prompt):
        ```bash
        set OLLAMA_HOST=<your_ollama_url>
        ```
    *   On macOS and Linux:
        ```bash
        export OLLAMA_HOST="<your_ollama_url>"
        ```
        If you don't set this, it will default to `http://localhost:11434`.

5.  **Run the application:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```
    The backend will now be accessible at `http://localhost:8000` (or `http://<your_ip>:8000`). The port 8000 is the default, but you can change it by modifying the `--port` argument if needed. For instance, to run on port 8500 (as previously configured in `docker-compose.yml` for external access), you would use:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8500
    ```
    Remember that the `OLLAMA_HOST` environment variable inside `main.py` defaults to `http://localhost:11434`. If Ollama is running elsewhere (like in a Docker container exposed on a different address from the backend's perspective), ensure this variable is correctly set.

## Accessing the API
Once running, the API documentation will be available at `http://localhost:8000/docs` (or your chosen port).




from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import get_answer_stream, memory_store

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str
    session_id: str  # Ajout du session_id transmis depuis React

@app.post("/ask_stream")
def ask_stream(payload: QuestionRequest):
    def event_generator():
        for token in get_answer_stream(payload.question, payload.session_id):
            yield f"{token}"
    return StreamingResponse(
        event_generator(),
        media_type="text/plain"
    )

@app.post("/reset_memory")
def reset_memory(session_id: str):
    memory_store.pop(session_id, None)
    return {"status": f"Historique effacé pour la session {session_id}"}

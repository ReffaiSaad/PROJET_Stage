from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import get_answer_stream, memory_store

app = FastAPI()

# Middleware CORS pour autoriser les requêtes cross-origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines (à restreindre en production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèle pour la requête de question
class QuestionRequest(BaseModel):
    question: str
    session_id: str

# Route pour le streaming des réponses
@app.post("/ask_stream")
def ask_stream(payload: QuestionRequest):
    try:
        # Générateur d'événements pour le streaming
        def event_generator():
            for token in get_answer_stream(payload.question, payload.session_id):
                yield f"{token}"
        
        # Retourne une réponse en streaming
        return StreamingResponse(
            event_generator(),
            media_type="text/plain"
        )
    except Exception as e:
        # Gestion des erreurs
        raise HTTPException(status_code=500, detail=f"Erreur lors du traitement de la question : {str(e)}")
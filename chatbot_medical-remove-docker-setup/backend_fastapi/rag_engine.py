






import ollama
from collections import defaultdict
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
ollama.base_url = ollama_host

# Mémoire par session utilisateur
memory_store = defaultdict(list)  # {session_id: [(question, answer), ...]}

def get_answer_stream(question: str, session_id: str):
    # Prompt système pour orienter le modèle
    system_prompt = """Tu es un assistant médical intégré dans une application de santé.
Ta mission est d’aider les utilisateurs à comprendre leurs symptômes, à mieux suivre leurs traitements et à répondre à leurs questions de manière claire, fiable et rassurante.
Réponds toujours en français, de façon simple et compréhensible, sans te substituer à un médecin.
Si une question dépasse tes compétences ou nécessite un avis médical professionnel, invite poliment l’utilisateur à consulter un professionnel de santé."""

    # Construit l'historique du chat
    messages = [{"role": "system", "content": system_prompt}]

    for q, a in memory_store[session_id]:
        messages.append({"role": "user", "content": q})
        messages.append({"role": "assistant", "content": a})

    # Ajoute la nouvelle question
    messages.append({"role": "user", "content": question})

    logger.info(f"Attempting to connect to Ollama at: {ollama.base_url}")
    logger.info(f"Sending messages to Ollama: {messages}")

    # Appel du modèle en streaming
    response = ollama.chat(
        model="gemma3:1b",
        messages=messages,
        stream=True
    )

    final_answer = ""
    first_chunk_logged = False
    for chunk in response:
        if not first_chunk_logged:
            logger.info(f"First chunk received from Ollama: {chunk}")
            first_chunk_logged = True
        content = chunk.get("message", {}).get("content", "")
        final_answer += content
        yield content
    
    if not first_chunk_logged:
        logger.info("No chunks received from Ollama stream.")

    # Mise à jour de la mémoire
    memory_store[session_id].append((question, final_answer))

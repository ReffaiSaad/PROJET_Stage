// Remplace cette URL par celle de ton backend réel
const API_URL = "http://localhost:8000"; // Par exemple, FastAPI tourne sur ce port

export async function askStream(
  question: string,
  sessionId: string,
  onToken: (fullText: string) => void
) {
  console.log("→ askStream démarré pour :", question);

  try {
    const resp = await fetch(`${API_URL}/ask_stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, session_id: sessionId }),
    });

    console.log("→ Status fetch :", resp.status);

    if (!resp.ok) {
      throw new Error(`API error ${resp.status}`);
    }

    const reader = resp.body!.getReader();
    const decoder = new TextDecoder();
    let full = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      full += chunk;
      onToken(full);
    }

    console.log("→ askStream terminé, réponse complète :", full);
  } catch (error) {
    console.error("❌ Erreur dans askStream:", error);
    throw error;
  }
}

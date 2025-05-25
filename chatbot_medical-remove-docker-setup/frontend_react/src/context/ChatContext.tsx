


// src/context/ChatContext.tsx
// frontend_react/src/context/ChatContext.tsx


/*import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, ChatContextType } from "../types";
import { askStream } from "../services/api";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext doit être utilisé dans un ChatProvider");
  return ctx;
};

// ✅ Gestion du session_id
const SESSION_ID_KEY = "chat_session_id";

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Bienvenue sur l’assistant virtuel d’Authen.tic ! Comment puis-je vous aider ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: uuidv4(), content, sender: "user", timestamp: new Date() },
    ]);
    setLoading(true);

    // Placeholder pour la réponse
    setMessages(prev => [
      ...prev,
      { id: uuidv4(), content: "", sender: "bot", timestamp: new Date() },
    ]);

    try {
      const sessionId = getSessionId(); // 📌 Récupération du session_id
      await askStream(content, sessionId, (fullText: string) => {
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          last.content = fullText;
          return copy;
        });
      });
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          content: "❌ Désolé, une erreur est survenue.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};*/

import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message, ChatContextType } from "../types";
import { askStream } from "../services/api";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext doit être utilisé dans un ChatProvider");
  return ctx;
};

// ✅ Gestion du session_id
const SESSION_ID_KEY = "chat_session_id";

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Bienvenue sur votre assistant santé ! Je suis là pour répondre à vos questions médicales, vous orienter et vous aider à mieux comprendre vos symptômes. Comment puis-je vous aider aujourd’hui ?",

      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: uuidv4(), content, sender: "user", timestamp: new Date() },
    ]);
    setLoading(true);

    // Placeholder pour la réponse
    setMessages(prev => [
      ...prev,
      { id: uuidv4(), content: "", sender: "bot", timestamp: new Date() },
    ]);

    try {
      const sessionId = getSessionId(); // 📌 Récupération du session_id
      await askStream(content, sessionId, (fullText: string) => {
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          last.content = fullText;
          return copy;
        });
      });
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          content: "❌ Désolé, une erreur est survenue.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};


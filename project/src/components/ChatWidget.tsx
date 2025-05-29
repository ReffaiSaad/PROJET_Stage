import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Chatbot from '../pages/ChatbotPage';
import { ChatProvider } from '../../../chatbot_medical-remove-docker-setup/frontend_react/src/context/ChatContext';

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Liste des routes où le chatbot doit être masqué
  const hiddenRoutes = ['/login', '/signup'];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <ChatProvider>
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Bouton flottant */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
          onClick={() => setOpen(!open)}
        >
          <MessageSquare className="w-6 h-6" />
        </button>

        {/* Fenêtre du chatbot */}
        {open && (
          <div className="mt-4 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <Chatbot />
          </div>
        )}
      </div>
    </ChatProvider>
  );
};

export default ChatWidget;

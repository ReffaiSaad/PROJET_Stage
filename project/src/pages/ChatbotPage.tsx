import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Chatbot from '../../../chatbot_medical-remove-docker-setup/frontend_react/src/components/ChatInterface';
import { ChatProvider } from '../../../chatbot_medical-remove-docker-setup/frontend_react/src/context/ChatContext';

const ChatbotPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-100 pt-10">
        {/* Bandeau principal */}
        <div className="text-center mt-10">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700 flex justify-center items-center gap-2">
            <MessageSquare className="text-blue-600" size={32} />
            Assistant Médical Virtuel
          </h1>
          <p className="text-gray-600 mt-2">
            Discutez avec notre assistant médical virtuel pour obtenir des informations sur vos symptômes.
          </p>
        </div>

        {/* Zone chatbot */}
        <div className="mt-8 px-4 md:px-0 flex justify-center">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
            <Chatbot />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default ChatbotPage;

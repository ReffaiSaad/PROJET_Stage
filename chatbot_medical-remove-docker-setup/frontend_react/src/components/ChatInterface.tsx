import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { HelpCircle } from 'lucide-react';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-[600px] w-full">
      {/* En-tête bleu */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-2">
          <HelpCircle size={24} />
          <h2 className="text-lg font-semibold">Assistant Médical</h2>
        </div>
        <p className="text-sm mt-1">
          Posez vos questions sur votre santé, vos symptômes ou vos traitements
        </p>
      </div>

      {/* Liste des messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <MessageList />
      </div>

      {/* Zone de saisie */}
      <MessageInput />
    </div>
  );
};

export default ChatInterface;

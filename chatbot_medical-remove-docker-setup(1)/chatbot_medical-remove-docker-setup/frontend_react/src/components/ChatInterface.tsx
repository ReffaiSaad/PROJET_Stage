import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { HelpCircle } from 'lucide-react';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
        <div className="flex items-center">
          <HelpCircle className="mr-2" size={24} />
          <h1 className="text-xl font-semibold">Assistant Médical</h1>
        </div>
        <p className="text-sm text-blue-100 mt-1">Posez vos questions sur votre santé, vos symptômes ou vos traitements</p>
      </div>
      
      <MessageList />
      
      <MessageInput />
    </div>
  );
};

export default ChatInterface;
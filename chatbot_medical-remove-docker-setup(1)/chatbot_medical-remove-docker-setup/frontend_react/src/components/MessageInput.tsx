import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Send } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, loading } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 border-t border-slate-200 p-4 bg-white"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question médicale ici..."

        className="flex-1 px-4 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className={`p-2 rounded-full ${
          loading || !input.trim()
            ? 'bg-slate-200 text-slate-400'
            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        }`}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default MessageInput;
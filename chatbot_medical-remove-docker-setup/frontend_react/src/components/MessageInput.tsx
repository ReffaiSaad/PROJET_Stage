import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Send } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, loading } = useChatContext();

  // Auto-resize de la textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

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
      className="flex items-center gap-2 border-t border-slate-200 p-4 bg-white w-full max-w-6xl mx-auto"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question ici..."
        rows={1}
        className="flex-1 resize-none px-4 py-2 rounded-full border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-40 w-full"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className={`p-3 rounded-full ${
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

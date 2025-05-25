

import React from 'react';
import { Message } from '../types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  // ✅ Convert Markdown to sanitized HTML
  const rawHtml = marked.parse(message.content);
  const cleanHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-lg ${
          isBot ? 'bg-white text-slate-800 shadow-sm' : 'bg-blue-600 text-white shadow-md'
        }`}
      >
        {/* ✅ Render HTML with proper Markdown formatting */}
        <div
          className={`text-sm md:text-base ${
            isBot ? 'prose prose-sm prose-slate dark:prose-invert' : 'text-white'
          }`}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        ></div>
        <p className={`text-xs mt-1 ${isBot ? 'text-slate-500' : 'text-blue-200'}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;

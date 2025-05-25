import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl h-[80vh]">
        <ChatProvider>
          <ChatInterface />
        </ChatProvider>
      </div>
    </div>
  );
}

export default App;
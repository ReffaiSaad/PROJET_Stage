import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour, je suis MedBot, votre assistant médical virtuel. Comment puis-je vous aider aujourd'hui?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Mock responses based on input
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('fièvre') || input.includes('temperature')) {
      return "La fièvre est généralement considérée comme une température corporelle supérieure à 38°C. Si vous avez de la fièvre, je vous recommande de vous reposer, de boire beaucoup d'eau, et de prendre un médicament comme le paracétamol pour réduire la fièvre. Si votre fièvre persiste plus de trois jours ou si elle est supérieure à 39.5°C, consultez un médecin.";
    } else if (input.includes('mal de tête') || input.includes('migraine') || input.includes('céphalée')) {
      return "Les maux de tête peuvent être causés par de nombreux facteurs comme le stress, la déshydratation, ou des problèmes de vision. Essayez de vous reposer dans un endroit calme et sombre, buvez de l'eau, et prenez un analgésique si nécessaire. Si les maux de tête sont sévères, fréquents, ou accompagnés d'autres symptômes, consultez un médecin.";
    } else if (input.includes('toux') || input.includes('tousser')) {
      return "La toux peut être due à diverses causes comme un rhume, une allergie, ou une irritation. Pour soulager une toux sèche, essayez de boire des boissons chaudes ou du miel. Pour une toux grasse, assurez-vous de rester bien hydraté. Si la toux persiste plus de 2 semaines ou s'accompagne de difficultés respiratoires, consultez un médecin.";
    } else if (input.includes('rhume') || input.includes('grippe') || input.includes('covid')) {
      return "Le rhume, la grippe et la COVID-19 partagent certains symptômes. Pour le rhume et la grippe, reposez-vous, buvez beaucoup de liquides et prenez des médicaments pour soulager les symptômes. Si vous suspectez la COVID-19, isolez-vous et faites-vous tester. Consultez un médecin si vos symptômes s'aggravent.";
    } else if (input.includes('douleur')) {
      return "La localisation et le type de douleur sont importants pour déterminer la cause. Pouvez-vous me donner plus de détails sur la douleur que vous ressentez? Où est-elle située? Est-elle constante ou intermittente? Quelle est son intensité sur une échelle de 1 à 10?";
    } else if (input.includes('merci') || input.includes('thank')) {
      return "Je vous en prie! N'hésitez pas si vous avez d'autres questions sur votre santé.";
    } else if (input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
      return "Bonjour! Comment puis-je vous aider aujourd'hui concernant votre santé?";
    } else {
      return "Je ne suis pas sûr de comprendre votre question. Pourriez-vous reformuler ou me donner plus de détails sur vos symptômes? Je suis ici pour vous aider du mieux possible.";
    }
  };

  return (
    <div className="pt-16 pb-0 min-h-screen flex flex-col bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-blue-600" />
            Consultation virtuelle
          </h1>
          <p className="mt-2 text-gray-600">
            Discutez avec notre assistant médical virtuel pour obtenir des informations sur vos symptômes.
          </p>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <div className="max-w-5xl w-full mx-auto flex-grow flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-blue-100 ml-3' : 'bg-gray-100 mr-3'
                    }`}>
                      {message.isUser ? (
                        <User className={`h-5 w-5 text-blue-600`} />
                      ) : (
                        <Bot className={`h-5 w-5 text-gray-600`} />
                      )}
                    </div>
                    <div>
                      <div className={`px-4 py-3 rounded-xl text-sm sm:text-base ${
                        message.isUser 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}>
                        <p>{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                      <Bot className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-tl-none flex items-center">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Décrivez vos symptômes ou posez une question..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={input.trim() === '' || isTyping}
                className={`px-4 py-2 rounded-r-lg ${
                  input.trim() === '' || isTyping
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } flex items-center justify-center transition-colors`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ce chatbot ne fournit que des informations générales et ne remplace pas une consultation médicale réelle.
            </p>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #9CA3AF;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotPage;
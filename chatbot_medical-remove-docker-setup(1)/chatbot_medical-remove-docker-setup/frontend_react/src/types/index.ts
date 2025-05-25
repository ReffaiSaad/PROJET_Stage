export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => void;
}
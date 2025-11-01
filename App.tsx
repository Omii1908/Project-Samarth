
import React, { useState, useCallback, useRef } from 'react';
import { ChatMessage } from './types';
import { runQuery } from './services/geminiService';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import SuggestedQuestions from './components/SuggestedQuestions';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const conversationHistoryRef = useRef<ChatMessage[]>([]);

  const handleSendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    
    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    // Add a placeholder for the model's response
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const stream = runQuery(conversationHistoryRef.current, userMessage);
      let fullResponse = '';
      
      for await (const chunk of stream) {
          fullResponse += chunk;
          setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { role: 'model', content: fullResponse };
              return newMessages;
          });
      }

      conversationHistoryRef.current = [
          ...conversationHistoryRef.current,
          newUserMessage,
          { role: 'model', content: fullResponse }
      ];

    } catch (err) {
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setError(errorMessage);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'model' && lastMessage.content === '') {
            newMessages[newMessages.length - 1] = { role: 'model', content: errorMessage };
        } else {
            newMessages.push({ role: 'model', content: errorMessage });
        }
        return newMessages;
    });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
        <div className="w-full md:w-1/4 lg:w-1/5 p-4 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <SuggestedQuestions onQuestionClick={handleSendMessage} disabled={isLoading} />
        </div>
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            messages={messages} 
            isLoading={isLoading} 
            error={error} 
            onSendMessage={handleSendMessage} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;

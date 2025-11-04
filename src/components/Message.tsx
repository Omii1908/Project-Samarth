
import React from 'react';
import { ChatMessage } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';
import ChartRenderer from './ChartRenderer';

interface MessageProps {
  message: ChatMessage;
}

// Function to safely parse markdown
const parseMarkdown = (content: string) => {
  const marked = (window as any).marked;
  if (marked) {
    return marked.parse(content);
  }
  return content.replace(/\n/g, '<br />'); // Fallback
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end items-start gap-3">
        <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xl">
          <p>{message.content}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <UserIcon />
        </div>
      </div>
    );
  }

  // Logic for model messages (which may contain charts)
  const renderModelMessage = () => {
    if (!message.content) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
        </div>
      );
    }

    const parts = message.content.split(/(```chartjson\n[\s\S]*?\n```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```chartjson')) {
        const jsonString = part.replace('```chartjson\n', '').replace('\n```', '');
        return <ChartRenderer key={index} chartData={jsonString} />;
      } else {
        if (part.trim() === '') return null;
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(part) }}
          />
        );
      }
    });
  };

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
        <BotIcon />
      </div>
      <div className="bg-gray-100 p-4 rounded-xl max-w-4xl prose">
        {renderModelMessage()}
      </div>
    </div>
  );
};

export default Message;

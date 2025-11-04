
import React from 'react';
import { SUGGESTED_QUESTIONS } from '../constants';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled: boolean;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick, disabled }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Sample Questions</h2>
      <div className="space-y-3">
        {SUGGESTED_QUESTIONS.map((q, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(q)}
            disabled={disabled}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="text-sm text-gray-600">{q}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;

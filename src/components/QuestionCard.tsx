// A card that presents each quiz question in a clean, engaging way
// Question Card - Displays question and interactive answer options
import React from 'react';

// Props for the question card component
interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

// Component that displays a single question with its answer options
export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-neutral-800">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={function () {
              onSelectAnswer(option);
            }}
            className={`w-full transform rounded-lg border p-4 text-left transition-all duration-300 ease-in-out hover:scale-[1.02] ${
              selectedAnswer === option
                ? 'border-green-500 bg-green-500 text-neutral-50'
                : 'border-neutral-200 bg-transparent text-neutral-800 hover:border-green-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

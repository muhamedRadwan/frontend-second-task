import React from 'react';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import QuizNavigation from './QuizNavigation';


interface QuizLayoutProps {
  title: string;
  secondsLeft: number;
  currentQuestion: {
    question: string;
    options: string[];
  };
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  currentIndex: number;
  totalQuestions: number;
  onBack: () => void;
  onNext: () => void;
}


//Main layout component that structures the quiz interface
export default function QuizLayout({
  title,
  secondsLeft,
  currentQuestion,
  selectedAnswer,
  onSelectAnswer,
  currentIndex,
  totalQuestions,
  onBack,
  onNext,
}: QuizLayoutProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-stone-50 p-4">
      <div className="w-full max-w-lg rounded-lg border border-stone-200 bg-stone-50 p-6 shadow-xl">
        <Timer secondsLeft={secondsLeft} />
        <h1 className="mb-6 text-2xl font-bold text-neutral-800">{title}</h1>

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />

        <QuizNavigation
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          onBack={onBack}
          onNext={onNext}
        />
      </div>
    </div>
  );
}

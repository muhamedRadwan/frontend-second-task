import React from 'react';

// Navigation controls to help move through the quiz questions
interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onBack: () => void;
  onNext: () => void;
}

export default function QuizNavigation(props: QuizNavigationProps) {
  const isLastQuestion = props.currentIndex === props.totalQuestions - 1;
  const isFirstQuestion = props.currentIndex === 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-full gap-4">
        <button
          onClick={props.onBack}
          disabled={isFirstQuestion}
          className={
            'w-full transform rounded-lg border py-2 text-xl transition-all duration-300 ease-in-out hover:scale-[1.02] ' +
            (isFirstQuestion
              ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-300'
              : 'border-neutral-800 bg-transparent text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50')
          }
        >
          Back
        </button>

        <button
          onClick={props.onNext}
          className="w-full transform cursor-pointer rounded-lg bg-neutral-800 py-2 text-xl text-neutral-50 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-neutral-900"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>

      <div className="text-center text-sm text-slate-600">
        Question {props.currentIndex + 1} of {props.totalQuestions}
      </div>
    </div>
  );
}

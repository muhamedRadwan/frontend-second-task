import React from 'react';

// The welcoming screen where your quiz journey begins

interface StartScreenProps {
  title: string;
  totalQuestions: number;
  onStart: () => void;
}

export default function StartScreen(props: StartScreenProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-stone-50 p-4">
      <div className="w-full max-w-lg rounded-lg border border-stone-200 bg-stone-50 px-6 py-10 text-center shadow-xl">
        <h1 className="mb-4 text-3xl font-bold text-neutral-800">{props.title}</h1>
        <p className="mb-6 text-stone-600">Total Questions: {props.totalQuestions}</p>
        <button
          onClick={props.onStart}
          className="transform rounded-lg bg-neutral-800 px-6 py-2 text-lg text-neutral-50 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-neutral-900"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// Shows the quiz results and celebrates the achievement
interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  timeTaken: string;
  onRestart: () => void;
}

export default function ResultScreen(props: ResultScreenProps) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(function () {
    const handleResize = function () {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-stone-50 p-4">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
      />
      <div className="w-full max-w-lg rounded-lg border border-stone-200 bg-stone-50 px-6 py-10 shadow-xl">
        <div className="text-center">
          <h1 className="mb-6 text-2xl font-bold text-neutral-800">Quiz Completed</h1>
          <p className="mb-4 text-lg">
            Your score: <strong>{props.score}</strong> out of {props.totalQuestions}
          </p>
          <p className="text-md mb-6 text-stone-600">Time taken: {props.timeTaken}</p>
          <button
            onClick={props.onRestart}
            className="transform rounded-lg bg-neutral-800 px-6 py-2 text-lg text-neutral-50 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-neutral-900"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

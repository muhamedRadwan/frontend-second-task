import { useState } from 'react';
import type { QuizData } from '../types/quiz';

// A helpful hook that manages your quiz's state and progress
export function useQuizState(quizData: QuizData | undefined) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function startQuiz() {
    setIsStarted(true);
    setShowResult(false);
    setCurrentQuestionIndex(0);
    if (quizData) {
      setUserAnswers(new Array(quizData.questions.length).fill(''));
    }
  }

  function handleAnswer(answer: string) {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  }

  function handleNext() {
    if (quizData && currentQuestionIndex === quizData.questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function handleBack() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleRestart() {
    setIsStarted(false);
    setShowResult(false);
    setCurrentQuestionIndex(0);
    if (quizData) {
      setUserAnswers(new Array(quizData.questions.length).fill(''));
    }
  }

  return {
    isStarted,
    currentQuestionIndex,
    userAnswers,
    showResult,
    startQuiz,
    handleAnswer,
    handleNext,
    handleBack,
    handleRestart,
  };
}

// The brain of the quiz - keeps track of all quiz data and progress
// Quiz Context - Manages the state and actions for our quiz application
import { createContext, useContext, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchQuizData } from '../services/api';
import type { QuizData } from '../types/quiz';

// Core quiz state that tracks user progress
interface QuizState {
  isStarted: boolean;
  currentQuestionIndex: number;
  userAnswers: string[];
  showResult: boolean;
}

// Available actions users can take during the quiz
interface QuizActions {
  startQuiz: () => void;
  handleAnswer: (answer: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleRestart: () => void;
}

// Complete context type that combines state, actions, and API data
interface QuizContextType extends QuizState, QuizActions {
  quizData: QuizData | undefined;
  isLoading: boolean;
  error: string | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Main provider component that manages quiz state and provides it to children
export function QuizContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    isStarted: false,
    currentQuestionIndex: 0,
    userAnswers: [],
    showResult: false,
  });

  const { data, isLoading, error } = useQuery<QuizData>({
    queryKey: ['quiz'],
    queryFn: fetchQuizData,
  });

  if (data?.questions && Array.isArray(data.questions) && state.userAnswers.length === 0) {
    setState(function (prev) {
      return {
        ...prev,
        userAnswers: new Array(data.questions.length).fill(''),
      };
    });
  }

  function startQuiz() {
    if (!data?.questions) return;
    setState({
      isStarted: true,
      currentQuestionIndex: 0,
      userAnswers: new Array(data.questions.length).fill(''),
      showResult: false,
    });
  }

  function handleAnswer(answer: string) {
    setState(function (prev) {
      const updatedAnswers = [...prev.userAnswers];
      updatedAnswers[prev.currentQuestionIndex] = answer;
      return { ...prev, userAnswers: updatedAnswers };
    });
  }

  function handleNext() {
    if (!data?.questions) return;
    setState(function (prev) {
      if (prev.currentQuestionIndex === data.questions.length - 1) {
        return { ...prev, showResult: true };
      }
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
    });
  }

  function handleBack() {
    setState(function (prev) {
      if (prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      }
      return prev;
    });
  }

  function handleRestart() {
    if (!data?.questions) return;
    setState({
      isStarted: false,
      currentQuestionIndex: 0,
      userAnswers: new Array(data.questions.length).fill(''),
      showResult: false,
    });
  }

  return (
    <QuizContext.Provider
      value={{
        ...state,
        quizData: data,
        isLoading,
        error: error ? 'Error fetching quiz' : null,
        startQuiz,
        handleAnswer,
        handleNext,
        handleBack,
        handleRestart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to easily access quiz context from any component
export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used inside a provider');
  }
  return context;
}

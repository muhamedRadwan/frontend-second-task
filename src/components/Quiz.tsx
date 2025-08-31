import React from 'react';
import { useQuizContext } from '../context/QuizContext';
import StartScreen from './StartScreen';
import ResultScreen from './ResultScreen';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import QuizLayout from './QuizLayout';
import { calculateScore } from '../utils/calculateScore';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/formatTime';

// The heart of the quiz experience - manages questions, answers, and progress
export default function Quiz() {
  const {
    quizData,
    isLoading,
    error,
    isStarted,
    currentQuestionIndex,
    userAnswers,
    showResult,
    startQuiz,
    handleAnswer,
    handleNext,
    handleBack,
    handleRestart,
  } = useQuizContext();

  const totalSeconds = quizData ? quizData.timeInMinutes * 60 : 0;
  const { secondsLeft, timeSpent } = useTimer(isStarted, showResult, totalSeconds, () =>
    handleRestart()
  );

  if (!isStarted) {
    return (
      <StartScreen
        title={quizData?.title || 'Quiz'}
        totalQuestions={quizData?.questions.length || 0}
        onStart={startQuiz}
      />
    );
  }

  if (isLoading) return <LoadingScreen />;
  if (error || !quizData) return <ErrorScreen message={error || 'No quiz data'} />;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const score = calculateScore(quizData, userAnswers);

  if (showResult) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={quizData.questions.length}
        timeTaken={formatTime(timeSpent)}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuizLayout
      title={quizData.title}
      secondsLeft={secondsLeft}
      currentQuestion={currentQuestion}
      selectedAnswer={userAnswers[currentQuestionIndex]}
      onSelectAnswer={handleAnswer}
      currentIndex={currentQuestionIndex}
      totalQuestions={quizData.questions.length}
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}

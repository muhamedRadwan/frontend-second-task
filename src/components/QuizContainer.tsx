import { useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import ScoreScreen from "./ScoreScreen";
import { useQuizStore } from "@/lib/store";

const QuizContainer = () => {
  const {
    questions,
    currentQuestionIndex,
    score,
    quizState,
    isLoading,
    error,
    fetchQuestions,
    setCurrentQuestionIndex,
    incrementScore,
    setQuizState,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (quizState === "WELCOME") {
      fetchQuestions();
    }
  }, [quizState, fetchQuestions]);

  const handleStartQuiz = () => {
    setQuizState("QUESTION");
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      incrementScore();
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState("SCORE");
    }
  };

  const handleRestart = () => {
    resetQuiz();
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
        <button
          onClick={handleRestart}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      {quizState === "WELCOME" && <WelcomeScreen onStart={handleStartQuiz} />}

      {quizState === "QUESTION" && questions.length > 0 && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          onAnswerSubmit={handleAnswerSubmit}
          totalQuestions={questions.length}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}

      {quizState === "SCORE" && (
        <ScoreScreen
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default QuizContainer;

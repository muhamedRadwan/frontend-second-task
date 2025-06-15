import type { QuizData, UserAnswers } from '../types/quiz';

export function calculateScore(quizData: QuizData, userAnswers: UserAnswers): number {
  let total = 0;
  for (let i = 0; i < quizData.questions.length; i++) {
    if (quizData.questions[i].answer === userAnswers[i]) {
      total++;
    }
  }
  return total;
}

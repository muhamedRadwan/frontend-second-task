export interface QuizData {
  id: string;
  title: string;
  totalMarks: number;
  totalQuestions: number;
  timeInMinutes: number;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  image: string | null;
  mark: number;
}

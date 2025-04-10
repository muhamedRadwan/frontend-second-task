import { create } from 'zustand';

interface APIQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  image: string | null;
  mark: number;
}

interface APIResponse {
  id: string;
  title: string;
  totalMarks: number;
  totalQuestions: number;
  timeInMinutes: number;
  questions: APIQuestion[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string | null;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  quizState: 'WELCOME' | 'QUESTION' | 'SCORE';
  isLoading: boolean;
  error: string | null;
  fetchQuestions: () => Promise<void>;
  setCurrentQuestionIndex: (index: number) => void;
  incrementScore: () => void;
  setQuizState: (state: 'WELCOME' | 'QUESTION' | 'SCORE') => void;
  resetQuiz: () => void;
}

const defaultQuestions: Question[] = [
  {
    id: 1,
    question: "ما هي عاصمة مصر؟",
    options: ["القاهرة", "الإسكندرية", "الأقصر", "أسوان"],
    correctAnswer: "القاهرة"
  },
  {
    id: 2,
    question: "كم عدد محافظات مصر؟",
    options: ["25", "27", "29", "31"],
    correctAnswer: "27"
  },
  {
    id: 3,
    question: "ما هو أطول نهر في العالم؟",
    options: ["نهر النيل", "نهر الأمازون", "نهر المسيسيبي", "نهر اليانجتسي"],
    correctAnswer: "نهر النيل"
  }
];

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  quizState: 'WELCOME',
  isLoading: false,
  error: null,
  
  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('https://s3.vclasses.net/dev-alsamerre/quiz');
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data: APIResponse = await response.json();
      console.log('API Response:', data);
      
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid response format');
      }

      const formattedQuestions: Question[] = data.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        image: q.image
      }));

      set({ questions: formattedQuestions, isLoading: false });
    } catch (error) {
      console.error('Error fetching questions:', error);
      set({ questions: defaultQuestions, isLoading: false });
    }
  },

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  incrementScore: () => set((state) => ({ score: state.score + 1 })),

  setQuizState: (state) => set({ quizState: state }),

  resetQuiz: () => set({
    currentQuestionIndex: 0,
    score: 0,
    quizState: 'WELCOME'
  })
})); 
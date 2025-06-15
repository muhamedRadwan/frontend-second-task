import axios from 'axios';
import type { QuizData } from '../types/quiz';

// Handles all the communication with our quiz data server
const QUIZ_API_URL = 'https://s3.vclasses.net/dev-alsamerre/quiz';

async function fetchQuizData(): Promise<QuizData> {
  try {
    const response = await axios.get<QuizData>(QUIZ_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch quiz data.');
  }
}
export { fetchQuizData };

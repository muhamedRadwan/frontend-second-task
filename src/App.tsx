import './App.css';
import Quiz from './components/Quiz';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizContextProvider } from './context/QuizContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QuizContextProvider>
          <Quiz />
        </QuizContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

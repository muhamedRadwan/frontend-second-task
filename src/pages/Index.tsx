
import QuizContainer from "@/components/QuizContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-quiz-light py-8 md:py-16">
      <div className="container mx-auto px-4">
        <QuizContainer />
      </div>
    </div>
  );
};

export default Index;

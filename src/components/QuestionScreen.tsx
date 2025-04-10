import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, HelpCircle } from "lucide-react";

interface QuestionScreenProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    image?: string | null;
  };
  onAnswerSubmit: (isCorrect: boolean) => void;
  totalQuestions: number;
  currentQuestionIndex: number;
}

const QuestionScreen = ({
  question,
  onAnswerSubmit,
  totalQuestions,
  currentQuestionIndex,
}: QuestionScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      onAnswerSubmit(isCorrect);
      setSelectedAnswer(null);
    }
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-base font-medium text-quiz-purple flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              السؤال {currentQuestionIndex + 1} من {totalQuestions}
            </span>
            <span className="text-sm font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card className="p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-8 text-quiz-dark">
            {question.question}
          </h2>

          {question.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <img
                src={question.image}
                alt="Question"
                className="w-full h-auto rounded-lg shadow-md max-h-[300px] object-cover"
              />
            </motion.div>
          )}

          <RadioGroup
            className="space-y-4"
            value={selectedAnswer || ""}
            onValueChange={setSelectedAnswer}
          >
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${
                    selectedAnswer === option
                      ? "border-quiz-purple bg-quiz-light shadow-md"
                      : "border-gray-200 hover:border-quiz-purple/50"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="mr-3"
                  />
                  <div className="flex items-center w-full">
                    <div
                      className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm font-medium ${
                        selectedAnswer === option
                          ? "bg-quiz-purple text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base">{option}</span>
                    {selectedAnswer === option && (
                      <CheckCircle2 className="w-5 h-5 text-quiz-purple ml-auto" />
                    )}
                  </div>
                </label>
              </motion.div>
            ))}
          </RadioGroup>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`w-full mt-8 py-5 text-base ${
                !selectedAnswer
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-quiz-purple hover:bg-quiz-blue"
              }`}
            >
              السؤال التالي
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionScreen;

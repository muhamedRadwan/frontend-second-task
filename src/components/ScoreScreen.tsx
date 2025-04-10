
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, RefreshCw, Star, ThumbsUp, Frown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ScoreScreen = ({ score, totalQuestions, onRestart }: ScoreScreenProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  let message = "استمر في التعلم!";
  let icon = <Frown className="w-16 h-16 text-quiz-blue" />;
  
  if (percentage >= 90) {
    message = "ممتاز! أنت رائع!";
    icon = <Trophy className="w-16 h-16 text-yellow-500" />;
  } else if (percentage >= 70) {
    message = "عمل جيد جداً!";
    icon = <Award className="w-16 h-16 text-quiz-purple" />;
  } else if (percentage >= 50) {
    message = "جهد طيب!";
    icon = <ThumbsUp className="w-16 h-16 text-quiz-blue" />;
  }
  
  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: [0, 1.2, 1],
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <Card className="overflow-hidden shadow-xl border-none bg-gradient-to-b from-white to-quiz-light/50">
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={circleVariants}
              className="flex justify-center items-center w-32 h-32 rounded-full bg-quiz-light"
            >
              {icon}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-quiz-dark mb-3">اكتمل الاختبار!</h2>
            <p className="text-gray-600 text-lg mb-6">{message}</p>
          </motion.div>
          
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-6 rtl:space-x-reverse">
              <div className="text-center">
                <motion.div
                  initial="hidden"
                  animate={showAnimation ? "visible" : "hidden"}
                  variants={counterVariants}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl font-bold text-quiz-purple"
                >
                  {score}
                </motion.div>
                <div className="text-sm text-gray-500">الإجابات الصحيحة</div>
              </div>
              
              <div className="text-2xl text-gray-400 font-light">من</div>
              
              <div className="text-center">
                <motion.div
                  initial="hidden"
                  animate={showAnimation ? "visible" : "hidden"}
                  variants={counterVariants}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-5xl font-bold text-quiz-dark"
                >
                  {totalQuestions}
                </motion.div>
                <div className="text-sm text-gray-500">سؤال</div>
              </div>
            </div>
            
            <div className="mt-8 relative h-6 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-quiz-purple absolute top-0 left-0 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-sm font-medium">
                  {percentage}% النتيجة
                </span>
              </div>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onRestart} 
              className="w-full py-5 text-base bg-quiz-purple hover:bg-quiz-blue flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>حاول مرة أخرى</span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
      
      {showAnimation && percentage >= 70 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex justify-center"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
              >
                <Star 
                  size={24} 
                  className={i < Math.ceil(percentage / 20) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScoreScreen;

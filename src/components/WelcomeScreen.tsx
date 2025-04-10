
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpenCheck, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4 w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full overflow-hidden border-none shadow-xl bg-gradient-to-b from-white to-quiz-light/50">
        <CardContent className="p-8 flex flex-col items-center space-y-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="bg-quiz-purple/10 p-5 rounded-full"
          >
            <BookOpenCheck className="w-24 h-24 text-quiz-purple" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-quiz-dark text-center">
              تحدي <span className="text-quiz-purple">الاختبار</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-md text-center">
              اختبر معلوماتك مع اختبارنا المكون من 10 أسئلة. هل يمكنك الحصول على درجة كاملة؟
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onStart} 
              className="bg-quiz-purple hover:bg-quiz-blue transition-all duration-300 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg flex items-center gap-2 group"
            >
              ابدأ الاختبار
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomeScreen;

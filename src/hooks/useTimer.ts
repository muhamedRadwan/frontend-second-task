import { useState, useEffect } from 'react';

// A handy hook that helps keep track of time during your quiz
export function useTimer(
  isStarted: boolean,
  showResult: boolean,
  totalSeconds: number,
  onTimeExpire: () => void
) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [timeSpent, setTimeSpent] = useState(0);

  // Reset timer when quiz starts
  useEffect(
    function () {
      if (isStarted && !showResult) {
        setSecondsLeft(totalSeconds);
        setTimeSpent(0);
      }
    },
    [isStarted, showResult, totalSeconds]
  );

  // Timer countdown
  useEffect(
    function () {
      if (!isStarted || showResult || totalSeconds === 0) return;

      const intervalId = setInterval(function () {
        setSecondsLeft(function (prev) {
          if (prev <= 1) {
            clearInterval(intervalId);
            onTimeExpire();
            return 0;
          }
          return prev - 1;
        });

        setTimeSpent(function (prev) {
          return prev + 1;
        });
      }, 1000);

      return function () {
        clearInterval(intervalId);
      };
    },
    [isStarted, showResult, totalSeconds, onTimeExpire]
  );

  return { secondsLeft, timeSpent, setSecondsLeft, setTimeSpent };
}

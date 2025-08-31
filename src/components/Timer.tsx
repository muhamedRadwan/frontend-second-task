import React from 'react';

// Keeps track of time during the quiz adventure

interface TimerProps {
  secondsLeft: number;
}

export default function Timer(props: TimerProps) {
  function formatTime(seconds: number): string {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return min + ':' + (sec < 10 ? '0' + sec : sec);
  }

  return (
    <div className="mb-3 text-right text-sm font-semibold text-stone-600">
      Time Left: {formatTime(props.secondsLeft)}
    </div>
  );
}

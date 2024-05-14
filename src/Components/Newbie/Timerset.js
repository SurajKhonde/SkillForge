import React, { useState, useEffect } from 'react';
const CountdownTimer = ({ startTimer }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval;
    if (startTimer) {
      setTimeLeft(15* 60); // 15 minutes in seconds
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startTimer]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="text-4xl font-bold text-center mt-10">
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;

"use client";

import { useEffect, useState } from "react";

interface UseCountdownOptions {
  initialSeconds: number;
  onFinish?: () => void;
}

interface UseCountdownReturn {
  timeLeft: number;
  isFinished: boolean;
  restart: () => void;
  formattedTime: string;
}

export function useCountdown({
  initialSeconds,
  onFinish,
}: UseCountdownOptions): UseCountdownReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
      onFinish?.();
    }
  }, [timeLeft, isFinished, onFinish]);

  const restart = () => {
    setTimeLeft(initialSeconds);
    setIsFinished(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return {
    timeLeft,
    isFinished,
    restart,
    formattedTime,
  };
}

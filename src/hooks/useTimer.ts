import { useEffect, useState } from "react";

export default function useTimer(limit: number, onTimerEnd: any) {
  const [timeout, setTimeout] = useState(limit);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeout !== 0)
        setTimeout((seconds) => {
          return seconds - 1
        })
      else{
        setTimeout(0)
        onTimerEnd();
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  })

  return {
    timeout
  }
}
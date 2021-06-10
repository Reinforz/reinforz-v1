import { Dispatch, SetStateAction, useState } from 'react';

export interface UseCycleOutput {
  // Current item obtained from currentIndex
  currentItem: any;
  // Used to get the next item in the cycle
  getNextIndex: () => void;
  // Used to get the prev item in the cycle
  getPrevIndex: () => void;
  // Checks whether or not the cycle has been exhausted
  hasEnded: boolean;
  // Get the current index of the cycle
  currentIndex: number;
  // Checks whether currentIndex is the last item
  isLastItem: boolean;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export default function useCycle(items: any[]): UseCycleOutput {
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    setCurrentIndex,
    currentItem: items[currentIndex],
    getNextIndex: () => {
      setCurrentIndex(currentIndex + 1);
    },
    getPrevIndex: () => {
      setCurrentIndex(currentIndex - 1);
    },
    hasEnded: currentIndex === items.length,
    currentIndex,
    isLastItem: currentIndex === items.length - 1
  };
}

import { useState } from 'react';

/**
 * Hook to toggle between two values and store them inside local storage 
 * @param initial Initial value or a factory function
 * @param toggles Possible state to be toggled between
 * @param key local storage key
 * @returns current toggle, toggle setter and toggler
 */
export default function useToggle<T>(
  initial: T | (() => T),
  toggles: [T, T],
  key?: string
) {
  const [toggle, setToggle] = useState(() => {
    let value = initial;
    if (key) {
      let temp = typeof window !== "undefined" && localStorage.getItem(key);
      if (temp) value = temp as any;
    }
    return value as T;
  });
  return {
    current_toggle: toggle,
    setToggle,
    toggle: () => {
      const alternate = toggle === toggles[1] ? toggles[0] : toggles[1];
      if (key) typeof window !== "undefined" && localStorage.setItem(key, (alternate as any).toString());
      setToggle(alternate);
    }
  };
}

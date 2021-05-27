import { useState } from 'react';

export default function useToggle<T>(
  initial: T | (() => T),
  toggles: [T, T],
  key?: string
) {
  const [toggle, setToggle] = useState(() => {
    let value = initial;
    if (key) {
      let temp = localStorage.getItem(key);
      if (temp) value = temp as any;
    }
    return value as T;
  });
  return {
    current_toggle: toggle,
    setToggle,
    toggle: () => {
      const alternate = toggle === toggles[1] ? toggles[0] : toggles[1];
      if (key) localStorage.setItem(key, (alternate as any).toString());
      setToggle(alternate);
    }
  };
}

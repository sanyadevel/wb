import { useCallback, useEffect, useRef, useState } from 'react';

export const useFocus = () => {
  const [focused, setFocused] = useState(false);
  const onFocusHandler = useCallback(() => setFocused(true), []);
  const onBlurHandler = useCallback(() => setFocused(false), []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = ref.current;

    if (value) {
      value.addEventListener('focusin', onFocusHandler);
      value.addEventListener('focusout', onBlurHandler);
    }

    return () => {
      if (value) {
        value.removeEventListener('focusin', onFocusHandler);
        value.removeEventListener('focusout', onBlurHandler);
      }
    };
  }, [onBlurHandler, onFocusHandler, ref]);

  return { focused, ref };
};

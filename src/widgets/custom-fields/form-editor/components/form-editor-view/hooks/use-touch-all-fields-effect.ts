import { useEffect, useState } from 'react';
import { useTouchDeep } from './use-touch-deep';

export const useTouchAllFieldsEffect = () => {
  const [touched, setTouched] = useState(false);
  const touchDeep = useTouchDeep();

  // после первого рендера ставим все поля touched
  useEffect(() => {
    touchDeep();
    setTouched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return touched;
};

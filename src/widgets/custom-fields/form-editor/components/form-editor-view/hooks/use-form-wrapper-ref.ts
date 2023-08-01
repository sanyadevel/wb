import { useCallback, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormType } from '../../../../_form';
import { names } from '../../../../_form/names';

export const useFormWrapperRef = () => {
  const { setValue } = useFormContext<FormType>();

  const handleOnClick = useCallback(() => {
    setValue(names.focusedFieldIndex as any, -1);
  }, [setValue]);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (event.currentTarget === ref.current) handleOnClick();
    };

    if (ref.current) {
      ref.current.addEventListener('click', click);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener('click', click);
      }
    };
  }, [handleOnClick]);

  return ref;
};

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export const useCopyFormToClipboard = () => {
  const { getValues, formState } = useFormContext();

  const copyFormToClipboard = useCallback(() => {
    const structure = getValues();
    const info = { structure, state: { errors: formState.errors, touched: formState.touchedFields } };
    const infoText = JSON.stringify(info);
    navigator.clipboard.writeText(infoText);
  }, [formState, getValues]);

  return copyFormToClipboard;
};

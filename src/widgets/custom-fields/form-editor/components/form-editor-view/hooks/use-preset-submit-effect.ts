import { debounce } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FORM_SAVING_INTERVAL } from 'src/constants';
import { FormType } from '../../../../_form';
import { names } from '../../../../_form/names';

export const usePresetSubmitEffect = (onSubmit: (data: FormType) => void, touched: boolean) => {
  const { watch, getValues } = useFormContext<FormType>();

  const handleOnPresetSubmit = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  useEffect(() => {
    if (!touched) return () => {};
    const handleDebouncedOnSubmit = debounce(handleOnPresetSubmit, FORM_SAVING_INTERVAL);
    const subscription = watch((value, info) => {
      if (info.name !== names.focusedFieldIndex) handleDebouncedOnSubmit();
    });

    return () => subscription.unsubscribe();
  }, [handleOnPresetSubmit, touched, watch]);
};

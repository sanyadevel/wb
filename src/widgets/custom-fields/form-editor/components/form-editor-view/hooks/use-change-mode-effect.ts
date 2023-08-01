import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { FormType, form } from '../../../../_form';
import { names } from '../../../../_form/names';

export const useChangeModeEffect = () => {
  const { getValues, setValue } = useFormContext<FormType>();

  useEffect(() => {
    setValue(names.values._ as any, form.getDefaultValues(getValues().fields));
  }, [getValues, setValue]);
};

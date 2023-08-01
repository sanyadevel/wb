import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { isArray, forEach, isPlainObject } from 'lodash';
import { FormType } from '../../../../_form';

export const useTouchDeep = () => {
  const { getValues, setValue } = useFormContext<FormType>();

  const touchDeep = useCallback(
    (prefix?: string) => {
      const value = prefix ? getValues(prefix as any) : getValues();
      if (isArray(value) || isPlainObject(value)) {
        forEach(value, (val, key) => {
          const path: string = prefix ? `${prefix}.${key}` : key;
          setValue(path as any, val, { shouldTouch: true });
          touchDeep(path);
        });
      } else {
        const path: string = prefix || '';
        setValue(path as any, value, { shouldTouch: true });
      }
    },
    [getValues, setValue],
  );

  return touchDeep;
};

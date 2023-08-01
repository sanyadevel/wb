import React, { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from 'src/shared/components';
import { MAX_NAME_LENGTH } from 'src/constants';
import { names } from '../../../names';
import { FormType } from '../../../types';

type Props = {
  fieldName: string;
};

export const Name = memo(({ fieldName }: Props) => {
  const { setValue } = useFormContext<FormType>();
  const { field, fieldState } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  const handleOnBlur = useCallback(() => {
    if (fieldState.error && fieldState.error.type === 'too_small') {
      setValue(names.name as any, 'Новая форма', { shouldValidate: true, shouldTouch: true });
    }
    if (fieldState.error && fieldState.error.type === 'too_big') {
      setValue(names.name as any, field.value.slice(0, MAX_NAME_LENGTH), { shouldValidate: true, shouldTouch: true });
    }
    fieldProps.onBlur();
  }, [field.value, fieldProps, fieldState.error, setValue]);

  return (
    <Input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : undefined}
      inputRef={ref}
      label="Название формы"
      onBlur={handleOnBlur}
    />
  );
});

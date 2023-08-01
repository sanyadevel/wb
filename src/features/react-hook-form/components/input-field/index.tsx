import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Input } from 'src/shared/components/inputs/input';
import type { InputProps } from 'src/shared/components/inputs/input';

type Props = Omit<InputProps, 'name'> & { name: string };

export const InputField = memo(({ name, ...rest }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({ name: name as 'fieldName' });

  return (
    <Input
      errorText={error ? error.message : ''}
      inputRef={field.ref}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      value={field.value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
});

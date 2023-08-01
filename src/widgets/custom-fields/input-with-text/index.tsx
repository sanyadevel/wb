import { InputProps } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Input } from 'src/shared/components';

type Props = {
  fieldName: string;
  title: string;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  autoComplete?: string;
  type?: InputProps['type'];
};

export const InputWithText = memo(
  ({ autoComplete, fieldName, title, multiline, rows, maxRows, minRows, type }: Props) => {
    const { field, fieldState } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
    const { ref, ...fieldProps } = field;

    return (
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
        autoComplete={autoComplete}
        errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : undefined}
        inputRef={ref}
        label={title}
        maxRows={maxRows}
        minRows={minRows}
        multiline={multiline}
        rows={rows}
        type={type}
      />
    );
  },
);

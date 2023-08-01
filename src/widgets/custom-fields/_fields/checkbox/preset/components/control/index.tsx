import { FormHelperText, InputBase } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from 'src/shared/components';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  defaultValue: boolean;
};

export const Control = memo(({ fieldName, defaultValue }: Props) => {
  const { field, fieldState } = useController<{ name: boolean }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  return (
    <div className={styles.root}>
      <Checkbox checked={defaultValue} disabled />
      <div className={styles.input}>
        <InputBase
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...fieldProps}
          fullWidth
          inputRef={ref}
          multiline
          placeholder="Введите текст..."
          sx={{ fontSize: '0.875rem', padding: 0 }}
        />
        {fieldState.error && fieldState.isTouched && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
      </div>
    </div>
  );
});

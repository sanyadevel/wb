import { Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { HelpTooltip } from 'src/shared/components';
import { Toggle } from 'src/widgets/custom-fields/toggle';
import styles from './index.module.scss';
import { defaultValue } from '../../../default-value';

type Props = {
  fieldName: string;
  fieldValueName?: string;
  title: string;
  hint?: string;
};

export const MultiChoiceToggle = memo(({ fieldName, title, hint, fieldValueName }: Props) => {
  const methods = useFormContext();
  const { field } = useController<{ name: boolean }, 'name'>({ name: fieldName as 'name' });
  const { ref, onChange, ...fieldProps } = field;

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (fieldValueName) {
        methods.setValue(fieldValueName as string, defaultValue);
      }

      onChange(event, checked);
    },
    [fieldValueName, methods, onChange],
  );

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <Typography variant="text">{title}</Typography>
        {hint && <HelpTooltip>{hint}</HelpTooltip>}
      </div>
      <Toggle
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
        checked={field.value}
        inputRef={ref}
        onChange={handleOnChange}
      />
    </div>
  );
});

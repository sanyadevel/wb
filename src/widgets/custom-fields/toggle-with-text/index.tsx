import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { HelpTooltip } from 'src/shared/components';
import { Toggle } from '../toggle';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  title: string;
  hint?: string;
};

export const ToggleWithText = memo(({ fieldName, title, hint }: Props) => {
  const { field } = useController<{ name: boolean }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

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
      />
    </div>
  );
});

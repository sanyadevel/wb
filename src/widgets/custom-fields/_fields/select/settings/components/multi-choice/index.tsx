import { Typography } from '@mui/material';
import { ChangeEvent, memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Toggle } from '../../../../../toggle';
import { names } from '../../../names';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
};

export const MultiChoice = memo(({ fieldName }: Props) => {
  const multiChoiceFieldName = `${fieldName}.${names.multiChoice}`;
  const { setValue } = useFormContext();
  const { field } = useController<{ name: boolean }, 'name'>({ name: multiChoiceFieldName as 'name' });
  const { ref, ...fieldProps } = field;

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setValue(multiChoiceFieldName, checked);
      setValue(`${fieldName}.${names.defaultValue}` as string, checked ? [] : '');
    },
    [fieldName, multiChoiceFieldName, setValue],
  );

  return (
    <div className={styles.root}>
      <Typography variant="text">Множественный выбор</Typography>
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

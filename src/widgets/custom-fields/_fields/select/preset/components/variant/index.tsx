import { FormHelperText, InputBase, Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from 'src/shared/components';
import { DraggableFieldItem } from '../../../../../draggable-field-item';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  index: number;
  listName: string;
  onDelete: (index: number) => void;
  onMove: (index1: number, index2: number) => void;
  multi: boolean;
};

export const Variant = memo(({ fieldName, index, listName, onDelete, onMove, multi }: Props) => {
  const onDeleteHandler = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  const { field, fieldState } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  return (
    <DraggableFieldItem index={index} listName={listName} onDelete={onDeleteHandler} onMove={onMove}>
      <div className={styles.root}>
        {multi ? (
          <Checkbox disabled />
        ) : (
          <Typography className={styles.number} color="secondary">
            {index + 1}.
          </Typography>
        )}
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
          {fieldState.error && fieldState.isTouched && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </div>
      </div>
    </DraggableFieldItem>
  );
});

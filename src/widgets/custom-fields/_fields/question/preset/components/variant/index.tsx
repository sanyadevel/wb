import { FormHelperText, InputBase } from '@mui/material';
import React, { memo, useCallback, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Checkbox, Radio } from 'src/shared/components';
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

  const variantRef = useRef<HTMLInputElement | null>(null);

  const handleInputRef = useCallback(
    (instance: HTMLInputElement) => {
      ref(instance);
      variantRef.current = instance;
    },
    [ref],
  );

  const handelOnFocus = useCallback(() => {
    variantRef.current?.select();
  }, []);

  return (
    <DraggableFieldItem index={index} listName={listName} onDelete={onDeleteHandler} onMove={onMove}>
      <div className={styles.root}>
        {multi ? <Checkbox disabled /> : <Radio disabled />}
        <div className={styles.input}>
          <InputBase
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...fieldProps}
            fullWidth
            inputRef={handleInputRef}
            multiline
            onFocus={handelOnFocus}
            placeholder="Введите текст..."
            sx={{ fontSize: '13px', padding: 0 }}
          />
          {fieldState.error && fieldState.isTouched && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </div>
      </div>
    </DraggableFieldItem>
  );
});

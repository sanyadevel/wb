import React, { memo, useCallback } from 'react';
import { ListItemText } from '@mui/material';
import { Checkbox, Select, MenuItem, MarkdownView } from 'src/shared/components';
import { useWatch, useController } from 'react-hook-form';
import * as z from 'zod';
import { Struct, Value } from '../types';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  valueName: string;
};

const renderValueSchema = z.array(z.string());

export const View = memo(({ fieldName, valueName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  const value: Value = useWatch({ name: valueName });
  const { field, fieldState } = useController<{ name: Value }>({ name: valueName as 'name' });
  const { ref, name, onBlur, onChange } = field;

  const renderValue = useCallback(
    (unknownValues: unknown) => {
      const result = renderValueSchema.safeParse(unknownValues);
      if (result.success) {
        const values = result.data;
        const titleList = (values as Array<string>).map(
          v => fieldProps.variants.find(variant => variant.id === v)?.title || 'без имени',
        );

        return titleList.join(', ');
      }

      return 'ошибка валидации';
    },
    [fieldProps.variants],
  );

  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      <Select
        errorText={fieldState.error && fieldState.isTouched ? fieldState.error?.message : undefined}
        fullWidth
        helperText={fieldProps.comment}
        hint={fieldProps.hint}
        inputRef={ref}
        label={fieldProps.label}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        SelectProps={{
          multiple: fieldProps.multiChoice,
          renderValue: fieldProps.multiChoice ? renderValue : undefined,
        }}
        value={value}
      >
        {!fieldProps.multiChoice && <MenuItem value="">Не выбрано</MenuItem>}
        {fieldProps.variants.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {fieldProps.multiChoice ? (
              <>
                <Checkbox checked={value.includes(item.id)} />
                <ListItemText primary={item.title} />
              </>
            ) : (
              item.title
            )}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
});

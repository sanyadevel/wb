import { ListItemText, MenuItem } from '@mui/material';
import { memo, useCallback } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { Checkbox, Select } from 'src/shared/components';
import * as z from 'zod';
import { names } from '../../../names';
import { Struct } from '../../../types';

type Props = {
  fieldName: string;
};

const renderValueSchema = z.array(z.string());

export const DefaultValue = memo(({ fieldName }: Props) => {
  const defaultValueFieldName = `${fieldName}.${names.defaultValue}`;
  const { field } = useController<{ name: Struct['defaultValue'] }, 'name'>({
    name: defaultValueFieldName as 'name',
  });
  const { ref, ...fieldProps } = field;

  const variants: Struct['variants'] = useWatch({ name: `${fieldName}.${names.variants._}` });
  const multiChoice: Struct['multiChoice'] = useWatch({ name: `${fieldName}.${names.multiChoice}` });

  const renderValue = useCallback(
    (unknownValues: unknown) => {
      const result = renderValueSchema.safeParse(unknownValues);
      if (result.success) {
        const values = result.data;
        const titleList = (values as Array<string>).map(
          value => variants.find(variant => variant.id === value)?.title || 'без имени',
        );
        return titleList.join(', ');
      }
      return 'ошибка валидации';
    },
    [variants],
  );

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      fullWidth
      inputRef={ref}
      label="Значение по-умолчанию"
      SelectProps={{ renderValue: multiChoice ? renderValue : undefined, multiple: multiChoice }}
    >
      {!multiChoice && <MenuItem value="">Не выбрано</MenuItem>}
      {variants.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {multiChoice ? (
            <>
              <Checkbox checked={field.value.includes(item.id)} />
              <ListItemText primary={item.title} />
            </>
          ) : (
            item.title
          )}
        </MenuItem>
      ))}
    </Select>
  );
});

import { MenuItem } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Select } from 'src/shared/components';

type Props = {
  fieldName: string;
};

const DateFormats = ['DD.MM.YYYY', 'DD-MM-YYYY', 'DD/MM/YYYY'] as const;

export const Format = memo(({ fieldName }: Props) => {
  const { field } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      fullWidth
      inputRef={ref}
      label="Формат даты"
    >
      {DateFormats.map(format => (
        <MenuItem key={format} value={format}>
          {format.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
});

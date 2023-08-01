import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { Struct, Value } from '../types';

type Props = {
  value: Value;
  field: Struct;
};

export const TableView = memo(({ value, field }: Props) => {
  if (typeof value === 'string') {
    const variant = field.variants.find(item => item.id === value);

    if (variant) return <Typography variant="text">{variant.title}</Typography>;
    return null;
  }

  const variants: Array<string> = [];
  value.forEach(item => {
    const foundVariant = field.variants.find(variant => variant.id === item);
    if (foundVariant) variants.push(foundVariant.title);
  });

  return <Typography variant="text">{variants.join(', ')}</Typography>;
});

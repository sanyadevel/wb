import { FormControl, RadioGroup, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { ColorRadio } from '../../../../color-radio';
import { names } from '../../../names';
import { FormType } from '../../../types';
import styles from './index.module.scss';

const COLORS = [
  '#F4E5FF',
  '#FFE5EB',
  '#FDC2E5',
  '#FFE9D5',
  '#D5E0FF',
  '#B7E5FF',
  '#D5FFFC',
  '#E0FFD5',
  '#C26EFF',
  '#FF6EF1',
  '#7FE6A2',
  '#6ECBFF',
  '#42D6B3',
  '#6681DF',
  '#F9D966',
  '#F99B66',
] as const;

export const Color = memo(() => {
  const color = useController<{ name: FormType['color'] }>({ name: names.color as 'name' });
  const { ref: colorRef, ...colorProps } = color.field;

  return (
    <div className={styles.root}>
      <Typography variant="text">Цвет</Typography>
      <FormControl>
        <RadioGroup>
          <div className={styles.colors}>
            {COLORS.map(item => (
              <ColorRadio
                key={item}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...colorProps}
                checked={colorProps.value === item}
                color={item}
                value={item}
              />
            ))}
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
});

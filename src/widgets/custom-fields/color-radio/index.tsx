import { Radio, RadioProps, useTheme } from '@mui/material';
import React, { memo } from 'react';
import styles from './index.module.scss';

type Props = Omit<RadioProps, 'color'> & { color: string };

type ColorRadioIconProps = {
  color: string;
  checked?: boolean;
};

const ColorRadioIcon = ({ color, checked = false }: ColorRadioIconProps) => {
  const theme = useTheme();
  const { border, checkedBorder } = theme.palette.colorRadio;
  return (
    <span className={styles.iconBorder} style={{ borderColor: checked ? checkedBorder : border }}>
      <span className={styles.icon} style={{ background: color }} />
    </span>
  );
};

export const ColorRadio = memo(({ color, ...rest }: Props) => {
  return (
    <Radio
      checkedIcon={<ColorRadioIcon checked color={color} />}
      color="default"
      disableRipple
      icon={<ColorRadioIcon color={color} />}
      sx={{ padding: 0 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
});

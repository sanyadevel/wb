import React, { memo } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';
import styles from './index.module.scss';
import { Userpic } from '../userpic';

type Props = {
  firstName: string;
  lastName: string;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  isNotPic?: boolean;
};

enum FontSize {
  small = 13,
  medium = 14,
}

export const User = memo(({ firstName, lastName, size = 'medium', sx, isNotPic }: Props) => {
  return (
    <div className={styles.root}>
      {!isNotPic && <Userpic firstName={firstName} lastName={lastName} size={size} />}
      <Typography sx={{ fontSize: FontSize[size], ...sx }} variant="text">{`${firstName} ${lastName}`}</Typography>
    </div>
  );
});

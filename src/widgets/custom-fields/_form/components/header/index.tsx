import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { names } from '../../names';
import styles from './index.module.scss';

export const Header = memo(() => {
  const [name, description]: [string, string] = useWatch({ name: [names.name, names.description] });

  return (
    <div className={styles.root}>
      <Typography className={styles.name} variant="h1">
        {name}
      </Typography>
      <Typography className={styles.description} color="secondary" variant="subtext">
        {description}
      </Typography>
    </div>
  );
});

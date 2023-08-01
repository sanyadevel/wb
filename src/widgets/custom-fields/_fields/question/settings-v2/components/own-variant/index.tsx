import { InputBase } from '@mui/material';
import React, { memo } from 'react';
import { Checkbox, Radio } from 'src/shared/components';
import styles from './index.module.scss';

type Props = {
  multi: boolean;
};

export const OwnVariant = memo(({ multi }: Props) => {
  return (
    <div className={styles.root}>
      {multi ? <Checkbox disabled /> : <Radio disabled />}
      <div className={styles.input}>
        <InputBase
          defaultValue="Свой вариант ответа..."
          disabled
          fullWidth
          multiline
          sx={{ fontSize: '13px', padding: 0 }}
        />
      </div>
    </div>
  );
});

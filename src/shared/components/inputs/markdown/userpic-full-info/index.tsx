import React, { memo } from 'react';
import { Typography } from '@mui/material';
import { Userpic } from 'src/shared/components/other';
import styles from './index.module.scss';

type Props = {
  firstName?: string;
  lastName?: string;
  size?: 'tiny' | 'small' | 'medium';
  // TODO: вмержить тип из userpic чтобы был подсказки у компонента
};

export const UserPicFullInfo = memo(({ firstName = '', lastName = '', ...props }: Props) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={styles.root}>
      <div className={styles.userAvatar}>
        <Userpic
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
      <Typography variant="text">{fullName}</Typography>
    </div>
  );
});

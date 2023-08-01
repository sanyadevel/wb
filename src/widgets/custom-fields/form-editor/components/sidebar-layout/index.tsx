import { Box } from '@mui/material';
import React, { memo, PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  disabled?: boolean;
};

export const SidebarLayout = memo(({ disabled = false, children }: PropsWithChildren<Props>) => {
  return (
    <div className={cn(styles.root, { [styles.root_disabled]: disabled })}>
      <Box className={styles.content} sx={theme => ({ background: theme.palette.background.paper })}>
        {children}
      </Box>
      {disabled && <div className={styles.overlay} />}
    </div>
  );
});

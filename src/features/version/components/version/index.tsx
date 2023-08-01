import { Typography } from '@mui/material';
import { memo } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  version: string;
  className?: string;
  onDoubleClick?: () => void;
};

export const Version = memo(({ className, onDoubleClick, version }: Props) => {
  return (
    <div className={cn(styles.root, className)} onDoubleClick={onDoubleClick}>
      <Typography color="inherit" sx={{ fontSize: '10px' }}>
        {version}
      </Typography>
    </div>
  );
});

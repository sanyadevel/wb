import { Paper, useTheme } from '@mui/material';
import React, { memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

type Props = {
  color: string;
  onColorHeaderDoubleClick?: () => void;
  onClick?: () => void;
  disableHover?: boolean;
};

export const FormBasis = memo(
  ({ color, onColorHeaderDoubleClick, onClick, children, disableHover = false }: PropsWithChildren<Props>) => {
    const theme = useTheme();

    const [hover, setHover] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      const mouseOver = (event: MouseEvent) => {
        setHover(true);
      };

      const mouseOut = (event: MouseEvent) => {
        setHover(false);
      };

      const click = (event: MouseEvent) => {
        if (onClick) onClick();
      };

      if (ref.current) {
        ref.current.addEventListener('mouseover', mouseOver);
        ref.current.addEventListener('mouseout', mouseOut);
        ref.current.addEventListener('click', click);
      }

      return () => {
        if (ref.current) {
          ref.current.removeEventListener('mouseover', mouseOver);
          ref.current.removeEventListener('mouseout', mouseOut);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ref.current.removeEventListener('click', click);
        }
      };
    }, [onClick]);

    return (
      <Paper
        ref={ref}
        className={styles.root}
        sx={{
          outline: hover && !disableHover ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
        }}
      >
        <div className={styles.header} onDoubleClick={onColorHeaderDoubleClick} style={{ backgroundColor: color }} />
        {children}
      </Paper>
    );
  },
);

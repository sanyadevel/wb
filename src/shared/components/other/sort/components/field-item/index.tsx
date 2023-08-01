import React, { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import styles from './index.module.scss';

export type FieldItemProps = {
  onMouseOver?: () => void;
  onMouseOut?: () => void;
};

export const FieldItem = memo(({ onMouseOver, onMouseOut, children }: PropsWithChildren<FieldItemProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const [hover, setHover] = useState<boolean>(false);

  const onMouseOverHandler = useCallback(() => {
    setHover(true);
  }, []);
  const onMouseOutHandler = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    if (hover && onMouseOver) onMouseOver();
    if (!hover && onMouseOut) onMouseOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      ref={ref}
      className={styles.root}
      onMouseOut={onMouseOutHandler}
      onMouseOver={onMouseOverHandler}
      style={{
        background: hover ? theme.palette.fieldItem.background : 'none',
        borderRadius: theme.properties.borderRadius,
      }}
    >
      {children}
    </div>
  );
});

import React, { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { ButtonProps, IconButton, useTheme } from '@mui/material';
import { DeleteTwoTone } from '@mui/icons-material';
import styles from './index.module.scss';

export type FieldItemProps = {
  onDelete?: ButtonProps['onClick'];
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  warning?: boolean;
};

export const FieldItem = memo(
  ({ onDelete, onMouseOver, onMouseOut, onFocus, onBlur, warning, children }: PropsWithChildren<FieldItemProps>) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();

    const [hover, setHover] = useState<boolean>(false);

    const [focused, setFocused] = useState<boolean>(false);

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

    useEffect(() => {
      if (focused && onFocus) onFocus();
      if (!focused && onBlur) onBlur();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused]);

    useEffect(() => {
      const focusin = () => setFocused(true);
      const focusout = () => setFocused(false);

      const value = ref.current;
      if (value) {
        value.addEventListener('focusin', focusin);
        value.addEventListener('focusout', focusout);
      }

      return () => {
        if (value) {
          value.removeEventListener('focusin', focusin);
          value.removeEventListener('focusout', focusout);
        }
      };
    }, []);

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
        ref={ref}
        className={styles.root}
        onMouseOut={onMouseOutHandler}
        onMouseOver={onMouseOverHandler}
        style={{
          background: focused || hover ? theme.palette.fieldItem.background : 'none',
          borderRadius: theme.properties.borderRadius,
        }}
      >
        {children}
        <div className={styles.controls} style={{ opacity: Number(hover || focused) }}>
          <IconButton color="secondary" disabled={!onDelete} onClick={onDelete} size="small">
            <DeleteTwoTone fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  },
);

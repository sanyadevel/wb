/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { memo, MouseEventHandler, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, ButtonProps, IconButton, useTheme, IconButtonProps } from '@mui/material';
import { Add, ContentCopyTwoTone, DeleteTwoTone } from '@mui/icons-material';
import styles from './index.module.scss';

export type FieldBlockProps = {
  onAdd?: IconButtonProps['onClick'];
  onCopy?: ButtonProps['onClick'];
  onDelete?: ButtonProps['onClick'];
  onBlur: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  focused: boolean;
  warning?: boolean;
  onClick: () => void;
};

export const FieldBlock = memo(
  ({
    onAdd,
    onCopy,
    onDelete,
    onBlur,
    onMouseOver,
    onMouseOut,
    focused,
    warning,
    onClick,
    children,
  }: PropsWithChildren<FieldBlockProps>) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();

    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
      const mouseOver = (event: MouseEvent) => {
        event.stopPropagation();
        setHover(true);
      };

      const mouseOut = (event: MouseEvent) => {
        event.stopPropagation();
        setHover(false);
      };

      if (ref.current) {
        ref.current.addEventListener('mouseover', mouseOver);
        ref.current.addEventListener('mouseout', mouseOut);
      }

      return () => {
        if (ref.current) {
          ref.current.removeEventListener('mouseover', mouseOver);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ref.current.removeEventListener('mouseout', mouseOut);
        }
      };
    }, [onClick]);

    const handleOnClick = useCallback<MouseEventHandler<HTMLDivElement>>(
      event => {
        event.stopPropagation();
        if (onClick) onClick();
      },
      [onClick],
    );

    useEffect(() => {
      if (hover && onMouseOver) onMouseOver();
      if (!hover && onMouseOut) onMouseOut();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hover]);

    let outline: string;
    if (warning) {
      outline = `1px solid ${theme.palette.error.main}`;
    } else if (hover || focused) {
      outline = `1px solid ${theme.palette.primary.main}`;
    } else {
      outline = '1px solid transparent';
    }

    return (
      <div ref={ref} className={styles.root} onClick={handleOnClick}>
        <div className={styles.outline} style={{ outline }}>
          {children}
        </div>
        <div className={styles.controls} style={{ opacity: Number(hover), outline }}>
          <IconButton disabled={!onAdd} onClick={onAdd} size="small">
            <Add />
          </IconButton>
          <ButtonGroup size="small">
            <Button disabled={!onCopy} onClick={onCopy}>
              <ContentCopyTwoTone />
            </Button>
            <Button disabled={!onDelete} onClick={onDelete}>
              <DeleteTwoTone />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
);

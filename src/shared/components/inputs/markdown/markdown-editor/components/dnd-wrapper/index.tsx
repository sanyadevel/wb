import { AttachmentRounded } from '@mui/icons-material';
import { Typography, useTheme } from '@mui/material';
import React, { memo, PropsWithChildren, useLayoutEffect, useMemo } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import styles from './index.module.scss';

export type InnerRef = { open: () => void };

type Props = {
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  onDrop?: (files: Array<File>) => void;
  innerRef: React.MutableRefObject<InnerRef | null>;
};

export const DndWrapper = memo(
  ({ onDrop, disabled, maxFiles, maxSize, accept, children, innerRef }: PropsWithChildren<Props>) => {
    const theme = useTheme();
    const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive, open } = useDropzone({
      onDrop,
      disabled,
      maxFiles,
      maxSize,
      accept,
      noClick: true,
      noKeyboard: true,
    });

    useLayoutEffect(() => {
      // eslint-disable-next-line no-param-reassign
      innerRef.current = { open };
    }, [innerRef, open]);

    const borderColor = useMemo(() => {
      if (isDragAccept) return theme.palette.primary.main;
      if (isDragReject) return theme.palette.error.main;
      return theme.palette.secondary.main;
    }, [
      isDragAccept,
      isDragReject,
      theme.palette.error.main,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ]);

    return (
      <div
        className={styles.root}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
        />
        <div className={styles.content}>{children}</div>
        {isDragActive && (
          <div className={styles.hint}>
            <AttachmentRounded sx={{ color: borderColor }} />
            <Typography sx={{ color: borderColor }} variant="text">
              Выберите файл или перетащите его в эту область
            </Typography>
          </div>
        )}
      </div>
    );
  },
);

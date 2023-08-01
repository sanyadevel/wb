import { AttachmentRounded } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import styles from './index.module.scss';

type Props = {
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  onDrop?: (files: Array<File>) => void;
};

export const DndArea = memo(({ onDrop, disabled, maxFiles, maxSize, accept }: Props) => {
  const theme = useTheme();
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    disabled,
    maxFiles,
    maxSize,
    accept,
  });

  const borderColor = useMemo(() => {
    if (isDragAccept) return theme.palette.primary.main;
    if (isDragReject) return theme.palette.error.main;
    return theme.palette.secondary.main;
  }, [isDragAccept, isDragReject, theme.palette.error.main, theme.palette.primary.main, theme.palette.secondary.main]);

  return (
    <Box
      className={styles.root}
      sx={{
        borderRadius: `${theme.properties.borderRadius}px`,
        border: `1px dashed ${borderColor}`,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
    >
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getInputProps()}
      />
      <div className={styles.content}>
        <AttachmentRounded sx={{ color: borderColor }} />
        <Typography sx={{ color: borderColor }} variant="text">
          Выберите файл или перетащите его в эту область
        </Typography>
      </div>
    </Box>
  );
});

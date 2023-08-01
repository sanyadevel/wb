import { DeleteTwoTone } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { getLink } from '../_utils/get-link';
import styles from './index.module.scss';

export type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: string;
};

type Props = {
  file: FileType;
  onDelete?: (file: FileType) => void;
};

export const S3FilePreview = memo(({ file, onDelete }: Props) => {
  const link = getLink(file.id);
  const isImage = file.type.startsWith('image');
  const [name, ext] = file.name.split('.');

  const handleOnDelete = useCallback(() => {
    if (onDelete) onDelete(file);
  }, [file, onDelete]);

  return (
    <div className={styles.root}>
      {isImage ? <img alt={file.name} className={styles.image} src={link} /> : <div className={styles.blank} />}
      <div className={cn(styles.controls, { [styles.controls_image]: isImage })}>
        <div className={styles.extension}>
          <Typography variant="subtext">{ext}</Typography>
        </div>
        <div className={styles.name}>
          <Typography variant="subtext">{name}</Typography>
        </div>
        <IconButton onClick={handleOnDelete} size="small">
          <DeleteTwoTone color="secondary" fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
});

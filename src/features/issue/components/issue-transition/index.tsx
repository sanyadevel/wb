import { Typography, useTheme } from '@mui/material';
import React, { memo } from 'react';
import { IssueStatusType } from 'src/theme/types/issue-status';
import styles from './index.module.scss';

type Props = {
  label: string;
  color: IssueStatusType;
  description?: string;
};

// todo в shared
export const IssueTransition = memo(({ label, color, description }: Props) => {
  const theme = useTheme();

  const labelColorDefault = theme.palette.issueTransition[color]?.label || theme.palette.issueTransition.info.label;
  const backgroundColorDefault =
    theme.palette.issueTransition[color]?.background || theme.palette.issueTransition.info.background;

  return (
    <div className={styles.root} style={{ backgroundColor: backgroundColorDefault }} title={description}>
      <div className={styles.box} style={{ backgroundColor: labelColorDefault }} />
      <Typography
        sx={{
          textTransform: 'uppercase',
        }}
        variant="tinytext"
      >
        {label}
      </Typography>
    </div>
  );
});

import { Typography, useTheme } from '@mui/material';
import React, { memo } from 'react';
import { IssueStatusType } from 'src/theme/types/issue-status';
import styles from './index.module.scss';

type Props = {
  label: string;
  color: IssueStatusType;
  description?: string;
};
export const IssueState = memo(({ label, color, description }: Props) => {
  const theme = useTheme();

  const colorDefault = theme.palette.issueStatus[color]?.text || theme.palette.issueStatus.info.text;
  const borderColorDefault = theme.palette.issueStatus[color]?.border || theme.palette.issueStatus.info.border;

  return (
    <div className={styles.root} title={description}>
      <Typography
        sx={{
          color: colorDefault,
          backgroundColor: borderColorDefault,
          textTransform: 'uppercase',
          borderRadius: '2px',
          padding: '2px 4px',
          borderStyle: 'solid',
          borderWidth: '1px',
        }}
        variant="tinytext"
      >
        {label}
      </Typography>
    </div>
  );
});

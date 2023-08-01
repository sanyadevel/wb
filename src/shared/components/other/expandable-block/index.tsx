import React, { PropsWithChildren, memo } from 'react';
import { Collapse, CollapseProps, useTheme } from '@mui/material';
import { KeyboardDoubleArrowLeftRounded, KeyboardDoubleArrowUpRounded } from '@mui/icons-material';
import styles from './index.module.scss';

type Props = {
  expanded?: boolean;
  onClick?: () => void;
  collapsedSize?: CollapseProps['collapsedSize'];
  orientation?: 'horizontal' | 'vertical';
};

export const ExpandableBlock = memo(
  ({ expanded = true, onClick, collapsedSize, orientation = 'vertical', children }: PropsWithChildren<Props>) => {
    const theme = useTheme();

    if (orientation === 'vertical')
      return (
        <div className={styles.root_vertical}>
          <button className={styles.button_vertical} onClick={onClick} type="button">
            <KeyboardDoubleArrowUpRounded
              sx={{
                color: theme.palette.expandableBlock.icon,
                transform: expanded ? '' : 'rotate(180deg)',
                transition: 'all 0.3s',
              }}
            />
          </button>
          <div className={styles.collapse_vertical}>
            <Collapse collapsedSize={collapsedSize} in={expanded} orientation={orientation}>
              {children}
            </Collapse>
          </div>
        </div>
      );

    return (
      <div className={styles.root_horizontal}>
        <button className={styles.button_horizontal} onClick={onClick} type="button">
          <KeyboardDoubleArrowLeftRounded
            sx={{
              color: theme.palette.expandableBlock.icon,
              transform: expanded ? 'rotate(180deg)' : '',
              transition: 'all 0.3s',
            }}
          />
        </button>
        <div className={styles.collapse_horizontal}>
          <Collapse collapsedSize={collapsedSize} in={expanded} orientation={orientation}>
            {children}
          </Collapse>
        </div>
      </div>
    );
  },
);

import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress,
  CircularProgressProps,
  useTheme,
} from '@mui/material';
import React, { memo } from 'react';
import classNames from 'classnames';
import { merge } from 'lodash';
import styles from './index.module.scss';

export type ButtonProps = MuiButtonProps & {
  isLoading?: boolean;
  loaderProps?: CircularProgressProps;
};

export const Button = memo(
  ({ variant = 'text', isLoading = false, disabled, fullWidth, loaderProps, sx, ...rest }: ButtonProps) => {
    const theme = useTheme();
    const { borderRadius } = theme.properties;
    const defaultSx: ButtonProps['sx'] = { borderRadius: `${borderRadius}px`, textTransform: 'none' };
    const newSx = merge(defaultSx, sx);

    return (
      <div className={classNames(styles.root, { [styles.root_fullWidth]: fullWidth })}>
        <MuiButton
          disabled={isLoading || disabled}
          disableElevation
          fullWidth={fullWidth}
          variant={variant}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          sx={newSx}
        />
        {isLoading && (
          <CircularProgress
            className={styles.preloader}
            size={24}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loaderProps}
          />
        )}
      </div>
    );
  },
);

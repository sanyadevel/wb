import { OutlinedTextFieldProps, useTheme, TextField, FormHelperText, SvgIconProps } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { merge } from 'lodash';
import { KeyboardArrowDownRounded } from '@mui/icons-material';
import styles from './index.module.scss';
import { HelpTooltip } from '../../other/help-tooltip';
import { CircularProgressSvg } from '../../icons';

export type SelectProps = Omit<OutlinedTextFieldProps, 'variant' | 'select'> & {
  errorText?: string;
  hint?: string;
  isLoading?: boolean;
};

export const Select = memo(
  ({ errorText, hint, helperText, label, disabled, sx, isLoading, ...restProps }: SelectProps) => {
    const theme = useTheme();

    const { main, hover, active, error, label: labelColor, disabledText, disabledBg } = theme.palette.select;
    const { borderRadius } = theme.properties;

    const defaultSx: SelectProps['sx'] = {
      minWidth: '100px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: main,
        borderRadius: `${borderRadius}px`,
      },
      '& .MuiSelect-icon': {
        color: main,
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: active,
        borderWidth: '1px',
      },
      '& .MuiOutlinedInput-root:not(.Mui-disabled)': {
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline ': {
            borderColor: hover,
          },
        },
      },
      '& .Mui-disabled': {
        backgroundColor: disabledBg,
        borderRadius: `${borderRadius}px`,
        WebkitTextFillColor: disabledText,
      },
      '& .MuiInputBase-root': {
        fontSize: '0.8125rem',
      },
    };

    const newSx = merge(defaultSx, sx);
    const switchedOff = disabled || isLoading;

    const IconHandler = useCallback(
      (props: SvgIconProps) =>
        isLoading ? (
          <CircularProgressSvg
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        ) : (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <KeyboardArrowDownRounded {...props} />
        ),
      [isLoading],
    );

    return (
      <div className={styles.root}>
        {label && (
          <FormHelperText sx={{ color: switchedOff ? disabledText : labelColor }} variant="outlined">
            {label}
          </FormHelperText>
        )}
        <div className={styles.select}>
          <TextField
            disabled={switchedOff}
            error={Boolean(errorText)}
            fullWidth
            select
            size="small"
            variant="outlined"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            SelectProps={{
              ...restProps.SelectProps,
              IconComponent: IconHandler,
              MenuProps: {
                ...restProps.SelectProps?.MenuProps,
                sx: {
                  '& .MuiPaper-root': { borderRadius: `${theme.properties.borderRadius}px` },
                  '& .MuiList-root': { padding: '8px' },
                  ...restProps.SelectProps?.MenuProps?.sx,
                },
              },
            }}
            sx={newSx}
          />
          {hint && <HelpTooltip>{hint}</HelpTooltip>}
        </div>
        {errorText && !switchedOff && (
          <FormHelperText sx={{ color: error }} variant="outlined">
            {errorText}
          </FormHelperText>
        )}
        {helperText && (
          <FormHelperText sx={{ color: switchedOff ? disabledText : labelColor }} variant="outlined">
            {helperText}
          </FormHelperText>
        )}
      </div>
    );
  },
);

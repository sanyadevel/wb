import { CheckBox as CheckboxIcon, CheckBoxOutlineBlankTwoTone } from '@mui/icons-material';
import { Checkbox as MuiCheckbox, CheckboxProps, Typography, FormHelperText } from '@mui/material';
import React, { memo } from 'react';
import { merge } from 'lodash';
import styles from './index.module.scss';

export type Props = CheckboxProps & { label?: string; errorText?: string; helperText?: string };

export const Checkbox = memo(({ label, errorText, helperText, disabled, sx, ...restProps }: Props) => {
  const defaultSx: Props['sx'] = { '&.MuiCheckbox-root': { padding: 0 } };

  const newSx = merge(defaultSx, sx);

  return (
    <div className={styles.root}>
      <div className={styles.checkbox}>
        <MuiCheckbox
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
          checkedIcon={<CheckboxIcon />}
          disabled={disabled}
          icon={<CheckBoxOutlineBlankTwoTone color="secondary" />}
          sx={newSx}
        />
        <Typography variant="text">{label}</Typography>
      </div>
      {errorText && !disabled && (
        <FormHelperText error variant="outlined">
          {errorText}
        </FormHelperText>
      )}
      {helperText && <FormHelperText variant="outlined">{helperText}</FormHelperText>}
    </div>
  );
});

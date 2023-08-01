import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { Collapse, IconButton, InputAdornment } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { Input } from 'src/shared/components';
import { ToggleWithText } from '../../../../toggle-with-text';
import { names } from '../../../names';
import { FormType } from '../../../types';
import styles from './index.module.scss';

export const Password = memo(() => {
  const on: FormType['password']['on'] = useWatch({ name: names.password.on });
  const value = useController<{ name: FormType['password']['value'] }>({
    name: names.password.value as 'name',
  });

  const { ref: valueRef, ...valueProps } = value.field;

  const [showPassword, setShowPassword] = useState(false);
  const switchPassVisibility = useCallback(() => {
    setShowPassword(oldValue => !oldValue);
  }, []);

  return (
    <div className={styles.root}>
      <ToggleWithText fieldName={`${names.password.on}`} hint="подсказка" title="Защита паролем" />
      <Collapse in={on}>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...valueProps}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={switchPassVisibility}>
                  <RemoveRedEyeOutlined color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputRef={valueRef}
          label="Установите пароль"
          type={showPassword ? 'text' : 'password'}
        />
      </Collapse>
    </div>
  );
});

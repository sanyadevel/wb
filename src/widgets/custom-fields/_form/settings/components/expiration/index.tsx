import { DateRangeTwoTone, WatchLaterTwoTone } from '@mui/icons-material';
import { Collapse, InputAdornment } from '@mui/material';
import React, { memo } from 'react';
import { Input } from 'src/shared/components';
import { useController, useWatch } from 'react-hook-form';
import { FormType } from '../../../types';
import { ToggleWithText } from '../../../../toggle-with-text';
import { names } from '../../../names';
import styles from './index.module.scss';

export const Expiration = memo(() => {
  const on: FormType['expiration']['on'] = useWatch({ name: names.expiration.on });
  const date = useController<{ name: FormType['expiration']['date'] }>({ name: names.expiration.date as 'name' });
  const time = useController<{ name: FormType['expiration']['time'] }>({ name: names.expiration.time as 'name' });
  const { ref: dateRef, ...dateProps } = date.field;
  const { ref: timeRef, ...timeProps } = time.field;

  return (
    <div className={styles.root}>
      <ToggleWithText fieldName={names.expiration.on} hint="подсказка" title="Дата и время закрытия формы" />
      <Collapse in={on}>
        <div className={styles.collapse}>
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...dateProps}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <DateRangeTwoTone color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={dateRef}
          />
          <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...timeProps}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <WatchLaterTwoTone color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={dateRef}
          />
        </div>
      </Collapse>
    </div>
  );
});

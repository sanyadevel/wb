import { Collapse, MenuItem } from '@mui/material';
import React, { memo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { Select } from 'src/shared/components';
import { ToggleWithText } from '../../../../toggle-with-text';
import { names } from '../../../names';
import { FormType } from '../../../types';
import styles from './index.module.scss';

export const ReplyLimit = memo(() => {
  const on: FormType['replyLimit']['on'] = useWatch({ name: names.replyLimit.on });
  const participants = useController<{ name: FormType['replyLimit']['participants'] }>({
    name: names.replyLimit.participants as 'name',
  });
  const replies = useController<{ name: FormType['replyLimit']['replies'] }>({
    name: names.replyLimit.replies as 'name',
  });
  const { ref: participantsRef, ...participantsProps } = participants.field;
  const { ref: repliesRef, ...repliesProps } = replies.field;

  return (
    <div className={styles.root}>
      <ToggleWithText
        fieldName={names.replyLimit.on}
        hint="подсказка"
        title="Ограничение количества полученных ответов"
      />
      <Collapse in={on}>
        <div className={styles.collapse}>
          <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...participantsProps}
            fullWidth
            hiddenLabel
            inputRef={participantsRef}
          >
            <MenuItem value={-1}>Не задано</MenuItem>
            <MenuItem value={5}>5 участников</MenuItem>
            <MenuItem value={10}>10 участников</MenuItem>
            <MenuItem value={50}>50 участников</MenuItem>
          </Select>
          <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...repliesProps}
            fullWidth
            hiddenLabel
            inputRef={repliesRef}
          >
            <MenuItem value={-1}>Не задано</MenuItem>
            <MenuItem value={5}>5 ответов</MenuItem>
            <MenuItem value={10}>10 ответов</MenuItem>
            <MenuItem value={50}>50 ответов</MenuItem>
          </Select>
        </div>
      </Collapse>
    </div>
  );
});

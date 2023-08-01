import React, { memo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { Checkbox, MarkdownView } from 'src/shared/components';
import { Struct, Value } from '../types';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  valueName: string;
};

export const View = memo(({ fieldName, valueName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  const { field, fieldState } = useController<{ name: Value }>({ name: valueName as 'name' });
  const { ref, value, ...fieldControllerProps } = field;

  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      <Checkbox
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldControllerProps}
        checked={value}
        errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : ''}
        helperText={fieldProps.comment ? fieldProps.comment : ''}
        inputRef={ref}
        label={fieldProps.text}
      />
    </div>
  );
});

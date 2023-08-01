import React, { memo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { Input, HelpTooltip, MarkdownView } from 'src/shared/components';
import { rowCount } from '../constants';
import { Struct, Value } from '../types';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  valueName: string;
};

export const View = memo(({ fieldName, valueName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  const { field, fieldState } = useController<{ name: Value }>({ name: valueName as 'name' });
  const { ref, ...fieldControllerProps } = field;

  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      <Input
        key={fieldProps.defaultValue + fieldProps.label}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldControllerProps}
        // fieldState.error обязательно идет первым иначе будет undefined
        errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : undefined}
        helperText={fieldProps.comment}
        InputProps={{
          readOnly: fieldProps.readOnly,
          endAdornment: fieldProps.hint && <HelpTooltip>{fieldProps.hint}</HelpTooltip>,
        }}
        inputRef={ref}
        label={fieldProps.label}
        maxRows={fieldProps.multiline ? rowCount.maxMultiline : rowCount.maxSingleLine}
        minRows={fieldProps.multiline ? rowCount.minMultiline : rowCount.minSingleLine}
        multiline={fieldProps.multiline}
        placeholder={fieldProps.placeholder}
      />
    </div>
  );
});

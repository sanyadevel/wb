import React, { memo, useCallback, useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, MarkdownView } from 'src/shared/components';
import { Struct, Value } from '../types';
// eslint-disable-next-line import/extensions
import 'dayjs/locale/ru';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
  valueName: string;
};

export const View = memo(({ fieldName, valueName }: Props) => {
  const { setValue } = useFormContext();
  const fieldProps: Struct = useWatch({ name: fieldName });
  const { field, fieldState } = useController<{ name: Value }>({ name: valueName as 'name' });

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(dayjs(field.value));

  useEffect(() => {
    if (field.value === null) setDatePickerValue(null);
  }, [field.value]);

  const handleOnChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      setDatePickerValue(date);
      if (date && date.isValid()) {
        setValue(valueName as string, date.toISOString(), { shouldTouch: true, shouldValidate: true });
      } else {
        setValue(valueName as string, null, { shouldTouch: true, shouldValidate: true });
      }
    },
    [setValue, valueName],
  );
  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      <DatePicker
        errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : ''}
        format={fieldProps.format}
        helperText={fieldProps.comment}
        hint={fieldProps.hint}
        inputRef={field.ref}
        label={fieldProps.label}
        onChange={handleOnChange}
        value={datePickerValue}
      />
    </div>
  );
});

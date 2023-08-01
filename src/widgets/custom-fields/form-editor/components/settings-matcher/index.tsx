import { Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { form, FormType } from '../../../_form';
import { FieldSettingsMatcher } from '../../../field-settings-matcher';
import { names } from '../../../_form/names';
import styles from './index.module.scss';

export const SettingsMatcher = memo(() => {
  const { setValue, getValues } = useFormContext<FormType>();
  const focusedFieldIndex: number = useWatch({ name: names.focusedFieldIndex });
  const focusedField = getValues().fields[focusedFieldIndex];

  const onClose = useCallback(() => {
    setValue(names.focusedFieldIndex as any, -1);
  }, [setValue]);

  if (focusedFieldIndex === -1)
    return (
      <div key="id_form_settings" className={styles.root}>
        <Typography className={styles.header} variant="h1">
          Настройки формы
        </Typography>
        <form.Settings />
      </div>
    );

  if (focusedField)
    return (
      <FieldSettingsMatcher
        key={focusedField.id}
        fieldName={names.fields.get(focusedFieldIndex)._}
        fieldType={focusedField.type}
        onClose={onClose}
      />
    );

  return null;
});

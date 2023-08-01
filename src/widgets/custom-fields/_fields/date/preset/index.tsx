import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { DatePicker } from 'src/shared/components';
import styles from './index.module.scss';
import { PresetMarkdown } from '../../_components';
import { Struct } from '../types';
import { names } from '../names';
// eslint-disable-next-line import/extensions
import 'dayjs/locale/ru';

type Props = {
  fieldName: string;
};

export const Preset = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });

  return (
    <div className={styles.root}>
      {fieldProps.title.on && (
        <PresetMarkdown fieldName={`${fieldName}.${names.title.value}`} fontSize="1.125rem" shortEdition />
      )}
      {fieldProps.subtitle.on && (
        <PresetMarkdown fieldName={`${fieldName}.${names.subtitle.value}`} fontSize="1rem" shortEdition />
      )}
      <DatePicker
        disabled
        format={fieldProps.format}
        helperText={fieldProps.comment}
        hint={fieldProps.hint}
        label={fieldProps.label}
      />
    </div>
  );
});

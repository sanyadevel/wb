import React, { memo } from 'react';
import { Input, HelpTooltip } from 'src/shared/components';
import { useWatch } from 'react-hook-form';
import styles from './index.module.scss';
import { PresetMarkdown } from '../../_components';
import { Struct } from '../types';
import { names } from '../names';
import { rowCount } from '../constants';

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
      <div className={styles.input}>
        <Input
          key={fieldProps.defaultValue + fieldProps.label}
          defaultValue={fieldProps.defaultValue}
          disabled
          helperText={fieldProps.comment}
          InputProps={{
            endAdornment: fieldProps.hint && <HelpTooltip>{fieldProps.hint}</HelpTooltip>,
          }}
          label={fieldProps.label}
          maxRows={fieldProps.multiline ? rowCount.maxMultiline : rowCount.maxSingleLine}
          minRows={fieldProps.multiline ? rowCount.minMultiline : rowCount.minSingleLine}
          multiline={fieldProps.multiline}
          placeholder={fieldProps.placeholder}
        />
      </div>
    </div>
  );
});

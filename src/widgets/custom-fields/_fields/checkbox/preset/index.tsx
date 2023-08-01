import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { HelpTooltip } from 'src/shared/components';
import { HelpText } from '../../../help-text';
import styles from './index.module.scss';
import { PresetMarkdown } from '../../_components';
import { Control } from './components';
import { Struct } from '../types';
import { names } from '../names';

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
      <div className={styles.control}>
        <div className={styles.wrapper}>
          <Control defaultValue={fieldProps.defaultValue} fieldName={`${fieldName}.${names.text}`} />
        </div>
        {fieldProps.hint && <HelpTooltip>{fieldProps.hint}</HelpTooltip>}
      </div>
      {fieldProps.comment && <HelpText>{fieldProps.comment}</HelpText>}
    </div>
  );
});

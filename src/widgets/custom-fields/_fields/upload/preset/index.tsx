import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { HelpTooltip } from 'src/shared/components';
import { DndArea } from '../../../dnd-area';
import styles from './index.module.scss';
import { Struct } from '../types';
import { PresetMarkdown } from '../../_components';
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
      <div className={styles.dndArea}>
        <div className={styles.wrapper}>
          <DndArea disabled />
        </div>
        {fieldProps.hint && <HelpTooltip>{fieldProps.hint}</HelpTooltip>}
      </div>
    </div>
  );
});

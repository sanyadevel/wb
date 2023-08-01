import React, { memo, useCallback } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import { Button } from 'src/shared/components/inputs/button';
import { HelpTooltip } from 'src/shared/components';
import styles from './index.module.scss';
import { OwnVariant, Variant } from './components';
import { PresetMarkdown } from '../../_components';
import { Struct } from '../types';
import { getVariantInit } from '../init';
import { names } from '../names';

type Props = {
  fieldName: string;
};

export const Preset = memo(({ fieldName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  const variants = useFieldArray({ name: `${fieldName}.${names.variants._}` });

  const onAddHandler = useCallback(() => {
    variants.append(getVariantInit());
  }, [variants]);

  return (
    <div className={styles.root}>
      {fieldProps.title.on && (
        <PresetMarkdown fieldName={`${fieldName}.${names.title.value}`} fontSize="1.125rem" shortEdition />
      )}
      {fieldProps.subtitle.on && (
        <PresetMarkdown fieldName={`${fieldName}.${names.subtitle.value}`} fontSize="1rem" shortEdition />
      )}
      <div className={styles.variants}>
        {variants.fields.map((item, index) => (
          <Variant
            key={item.id}
            fieldName={`${fieldName}.${names.variants.get(index).title}`}
            index={index}
            listName={fieldName}
            multi={fieldProps.multiChoice}
            onDelete={variants.remove}
            onMove={variants.swap}
          />
        ))}
        {fieldProps.ownVariant && <OwnVariant multi={fieldProps.multiChoice} />}
      </div>
      <div className={styles.controls}>
        <Button onClick={onAddHandler} startIcon={<Add />} variant="text">
          Добавить ответ
        </Button>
      </div>
      {fieldProps.hint && (
        <div className={styles.hint}>
          <HelpTooltip>{fieldProps.hint}</HelpTooltip>
        </div>
      )}
    </div>
  );
});

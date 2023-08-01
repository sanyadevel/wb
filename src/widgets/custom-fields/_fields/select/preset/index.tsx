import React, { memo, useCallback } from 'react';
import { MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Select } from 'src/shared/components';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from 'src/shared/components/inputs/button';
import styles from './index.module.scss';
import { Variant } from './components';
import { getVariantInit } from '../init';
import { Struct } from '../types';
import { PresetMarkdown } from '../../_components';
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
      <Select
        disabled
        fullWidth
        helperText={fieldProps.comment}
        hint={fieldProps.hint}
        label={fieldProps.label}
        SelectProps={{ multiple: fieldProps.multiChoice }}
        value={fieldProps.defaultValue}
      >
        {fieldProps.variants.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
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
      </div>
      <div className={styles.controls}>
        <Button onClick={onAddHandler} startIcon={<Add />} variant="text">
          Добавить ответ
        </Button>
      </div>
    </div>
  );
});

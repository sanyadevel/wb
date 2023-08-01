import React, { memo, useCallback } from 'react';
import { Add } from '@mui/icons-material';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Button } from 'src/shared/components/inputs/button';
import { Typography } from '@mui/material';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { BlockTitle, DefaultValue, MultiChoice, Variant } from './components';
import styles from './index.module.scss';
import { getVariantInit } from '../init';
import { Struct } from '../types';

type Props = {
  fieldName: string;
  fieldValueName?: string;
};

export const SettingsV2 = memo(({ fieldName, fieldValueName }: Props) => {
  const fieldProps: Struct = useWatch({ name: fieldName });
  const variants = useFieldArray({ name: `${fieldName}.${names.variants._}` });

  const onAddHandler = useCallback(() => {
    variants.append(getVariantInit());
  }, [variants]);

  return (
    <SettingsLayout>
      <BlockTitle />
      <TogglesLayout>
        {/*         <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" /> */}
        <MultiChoice fieldName={fieldName} fieldValueName={fieldValueName} />
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <DefaultValue fieldName={fieldName} />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
        <InputWithText fieldName={`${fieldName}.${names.comment}`} title="Подсказка под полем" />
      </InputsLayout>
      <div className={styles.variants}>
        <div className={styles.item}>
          <Typography variant="text">Варианты ответа</Typography>
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
    </SettingsLayout>
  );
});

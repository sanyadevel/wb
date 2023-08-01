import React, { memo, useCallback } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Add } from '@mui/icons-material';
import { Button } from 'src/shared/components/inputs/button';
import { Typography } from '@mui/material';
import { InputWithText } from '../../../input-with-text';
import { ToggleWithText } from '../../../toggle-with-text';
import { SettingsLayout, TogglesLayout, InputsLayout } from '../../_components';
import { names } from '../names';
import { Struct } from '../types';
import { MultiChoiceBlockTitle, SingleChoiceBlockTitle, OwnVariant, Variant, MultiChoiceToggle } from './components';
import styles from './index.module.scss';
import { getVariantInit } from '../init';

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
      {fieldProps.multiChoice ? <MultiChoiceBlockTitle /> : <SingleChoiceBlockTitle />}
      <TogglesLayout>
        {/*         <ToggleWithText fieldName={`${fieldName}.${names.title.on}`} title="Заголовок" />
        <ToggleWithText fieldName={`${fieldName}.${names.subtitle.on}`} title="Подзаголовок" /> */}
        <MultiChoiceToggle
          fieldName={`${fieldName}.${names.multiChoice}`}
          fieldValueName={fieldValueName}
          title="Множественный выбор"
        />
        <ToggleWithText fieldName={`${fieldName}.${names.ownVariant}`} title="Свой вариант" />
        <ToggleWithText fieldName={`${fieldName}.${names.required}`} title="Обязательный вопрос" />
      </TogglesLayout>
      <InputsLayout>
        <InputWithText fieldName={`${fieldName}.${names.label}`} title="Название поля" />
        <InputWithText fieldName={`${fieldName}.${names.hint}`} title="Всплывающая подсказка" />
      </InputsLayout>
      <div className={styles.variants}>
        <Typography variant="text">Варианты ответа</Typography>
        <div className={styles.items}>
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
      </div>
    </SettingsLayout>
  );
});

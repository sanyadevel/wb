import React, { memo, useState, useCallback } from 'react';
import { Input } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { MarkdownView, Checkbox, Radio, HelpTooltip } from 'src/shared/components';
import { ErrorText } from '../../../error-text';
import styles from './index.module.scss';
import { Struct, Value } from '../types';

type Props = {
  fieldName: string;
  valueName: string;
};

const OWN_VARIANT_ID = 'id_ownVariant';

export const View = memo(({ fieldName, valueName }: Props) => {
  const { setValue } = useFormContext();
  const fieldProps: Struct = useWatch({ name: fieldName });
  const fieldValue: Value = useWatch({ name: valueName });

  const [ownVariant, setOwnVariant] = useState<string>('');

  const handleSingleChoiceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const varianId = event.target.value;
      // const fieldId = event.target.name;

      if (varianId === OWN_VARIANT_ID) {
        setValue(valueName, [{ id: OWN_VARIANT_ID, title: ownVariant }], {
          shouldTouch: true,
          shouldValidate: true,
        });
      } else {
        const foundVariant = fieldProps.variants.find(item => item.id === varianId);
        if (foundVariant)
          setValue(valueName, [foundVariant], {
            shouldTouch: true,
            shouldValidate: true,
          });
      }
    },
    [fieldProps.variants, ownVariant, setValue, valueName],
  );

  const handleOwnVariantChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const ownVariantTitle = event.target.value;
      setOwnVariant(ownVariantTitle);
      const newValue = cloneDeep(fieldValue);
      const findIndex = newValue.findIndex(item => item.id === OWN_VARIANT_ID);
      if (findIndex > -1) {
        newValue[findIndex].title = ownVariantTitle;
        setValue(valueName, newValue, {
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    },
    [setValue, fieldValue, valueName],
  );

  const handleMultiChoiceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const varianId = event.target.value;
      const newValue = cloneDeep(fieldValue);
      const findIndex = newValue.findIndex(item => item.id === varianId);
      if (findIndex > -1) {
        newValue.splice(findIndex, 1);
      } else if (varianId === OWN_VARIANT_ID) {
        newValue.push({ id: OWN_VARIANT_ID, title: ownVariant });
      } else {
        const clickedVariant = fieldProps.variants.find(item => item.id === varianId);
        if (clickedVariant) newValue.push(clickedVariant);
      }
      setValue(valueName, newValue, {
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [fieldProps.variants, ownVariant, setValue, fieldValue, valueName],
  );

  const { fieldState: valueFieldState } = useController({ name: valueName as any });

  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      {fieldProps.multiChoice
        ? fieldProps.variants.map(item => (
            <div key={item.id} className={styles.variant}>
              <Checkbox
                checked={Boolean(fieldValue.find(i => i.id === item.id))}
                label={item.title}
                onChange={handleMultiChoiceChange}
                value={item.id}
              />
            </div>
          ))
        : fieldProps.variants.map(item => (
            <div key={item.id} className={styles.variant}>
              <Radio
                checked={Boolean(fieldValue.find(i => i.id === item.id))}
                label={item.title}
                onChange={handleSingleChoiceChange}
                value={item.id}
              />
            </div>
          ))}
      {fieldProps.multiChoice
        ? fieldProps.ownVariant && (
            <div className={styles.variant}>
              <Checkbox
                checked={Boolean(fieldValue.find(i => i.id === OWN_VARIANT_ID))}
                onChange={handleMultiChoiceChange}
                value={OWN_VARIANT_ID}
              />
              <Input
                disableUnderline
                fullWidth
                onChange={handleOwnVariantChange}
                placeholder="Другой ответ..."
                sx={{ fontSize: '0.8125rem' }}
                value={ownVariant}
              />
            </div>
          )
        : fieldProps.ownVariant && (
            <div className={styles.variant}>
              <Radio
                checked={Boolean(fieldValue.find(i => i.id === OWN_VARIANT_ID))}
                onChange={handleSingleChoiceChange}
                value={OWN_VARIANT_ID}
              />
              <Input
                disableUnderline
                fullWidth
                onChange={handleOwnVariantChange}
                placeholder="Другой ответ..."
                sx={{ fontSize: '0.8125rem' }}
                value={ownVariant}
              />
            </div>
          )}
      {valueFieldState.error && valueFieldState.isTouched && <ErrorText>{valueFieldState.error.message}</ErrorText>}
      {fieldProps.hint && (
        <div className={styles.hint}>
          <HelpTooltip>{fieldProps.hint}</HelpTooltip>
        </div>
      )}
    </div>
  );
});

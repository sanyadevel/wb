import React, { memo, useCallback } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import { usePopoverProps } from 'src/shared/hooks';
import { FormType } from '../../../types';
import { FieldType } from '../../../../_types';
import { AddField } from '../../../../add-field';
import { FieldListItem } from '../field-list-item';
import { names } from '../../../names';
import { getDefaultFieldValue, getDefaultLabelName } from '../../../utils';
import { AddFirstItem } from '../add-first-item';

export const FieldList = memo(() => {
  const { anchorElement, handleOpen, handleClose, isOpen } = usePopoverProps();
  const formMethods = useFormContext<FormType>();
  // useFieldArray уникален для одного поля формы.
  // нельзя использовать в разных компонентах с одним именем напр. useFieldArray({name:'testName'})
  const arrayMethods = useFieldArray({ name: names.fields._ as any });

  const focusedFieldIndex: number = useWatch({ name: names.focusedFieldIndex as any });

  const onAddHandler = useCallback(
    (field: FieldType) => {
      const form = formMethods.getValues();
      formMethods.setValue(names.focusedFieldIndex as any, form.focusedFieldIndex + 1);
      formMethods.setValue(`${names.values._}.${field.id}` as any, getDefaultFieldValue(field), {
        shouldTouch: true,
        shouldValidate: true,
      });
      const newField = { ...field };
      if (newField.type !== 'text') {
        newField.label = getDefaultLabelName(form.fields);
      }
      arrayMethods.insert(form.focusedFieldIndex + 1, newField);
    },
    [arrayMethods, formMethods],
  );

  const onFocusHandler = useCallback(
    (index: number) => {
      formMethods.setValue(names.focusedFieldIndex as any, index);
    },
    [formMethods],
  );

  const onCopyHandler = useCallback(
    (index: number) => {
      const { fields } = formMethods.getValues();
      const clonedField = { ...fields[index], id: nanoid() };
      if (clonedField.type !== 'text') {
        clonedField.label = getDefaultLabelName(fields);
      }
      formMethods.setValue(names.focusedFieldIndex as any, index + 1);
      formMethods.setValue(`${names.values._}.${clonedField.id}` as any, getDefaultFieldValue(clonedField));
      arrayMethods.insert(index + 1, clonedField);
    },
    [arrayMethods, formMethods],
  );

  const onDeleteHandler = useCallback(
    (index: number) => {
      const form = formMethods.getValues();
      const newValues = form.values;
      delete newValues[form.fields[index].id];
      formMethods.setValue(names.values._ as any, newValues);
      formMethods.setValue(names.focusedFieldIndex as any, -1);
      arrayMethods.remove(index);
    },
    [arrayMethods, formMethods],
  );

  const onBlurHandler = useCallback((index: number) => {}, []);

  const warningList = arrayMethods.fields.map((item, index) => !isEmpty(formMethods.formState.errors.fields?.[index])); // не засовывать в useMemo

  const noFields = arrayMethods.fields.length === 0;

  const onMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      arrayMethods.swap(dragIndex, hoverIndex);
      formMethods.setValue(names.focusedFieldIndex as any, hoverIndex);
    },
    [arrayMethods, formMethods],
  );

  return (
    <>
      {noFields && <AddFirstItem onClick={handleOpen} />}
      <AddField anchorEl={anchorElement} onAdd={onAddHandler} onClose={handleClose} open={isOpen} />
      {arrayMethods.fields.map((item: any, index) => {
        return (
          <FieldListItem
            key={item.id}
            fieldName={names.fields.get(index)._}
            fieldType={formMethods.getValues().fields[index].type}
            focused={focusedFieldIndex === index}
            index={index}
            listName="form"
            onAdd={handleOpen}
            onBlur={onBlurHandler}
            onCopy={onCopyHandler}
            onDelete={onDeleteHandler}
            onFocus={onFocusHandler}
            onMove={onMove}
            warning={warningList[index]}
          />
        );
      })}
    </>
  );
});

import React, { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { FieldViewMatcher } from '../../../../field-view-matcher';
import { FormType } from '../../../types';
import { names } from '../../../names';

export const FieldList = memo(() => {
  const fieldList: FormType['fields'] = useWatch({ name: names.fields._ });

  return (
    <>
      {fieldList.map((field, index) => {
        return (
          <FieldViewMatcher
            key={field.id}
            fieldName={names.fields.get(index)._}
            valueName={`${names.values._}.${field.id}`}
          />
        );
      })}
    </>
  );
});

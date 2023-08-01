import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { cloneDeep, pull } from 'lodash';
import { FILE_TYPES } from 'src/constants';
import { Checkbox } from 'src/shared/components';
import { Struct } from '../../../types';
import styles from './index.module.scss';

type Props = {
  fieldName: string;
};

export const Extensions = memo(({ fieldName }: Props) => {
  const { setValue } = useFormContext();
  const value: Struct['fileExtensions'] = useWatch({ name: fieldName });

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const checkboxValue = event.target.value;
      const newValue = cloneDeep(value);
      if (checked) newValue.push(checkboxValue);
      else pull(newValue, checkboxValue);
      setValue(fieldName as string, newValue, { shouldValidate: true, shouldTouch: true });
    },
    [fieldName, setValue, value],
  );

  return (
    <div className={styles.root}>
      {Object.entries(FILE_TYPES).map(([name, extList]) => (
        <Checkbox
          key={name}
          checked={value.includes(name)}
          label={extList.join(', ').toUpperCase()}
          onChange={handleOnChange}
          value={name}
        />
      ))}
    </div>
  );
});

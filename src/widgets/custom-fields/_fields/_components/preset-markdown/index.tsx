import React, { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MarkdownEditor } from 'src/shared/components';
import { Upload } from '../../../types';

type Props = {
  fieldName: string;
  fontSize: '1.125rem' | '1rem';
  shortEdition?: boolean;
  upload?: Upload;
};

export const PresetMarkdown = memo(({ fieldName, fontSize, shortEdition, upload }: Props) => {
  const { field } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;
  const { setValue } = useFormContext();
  const setVal = useCallback(
    (v: string) => {
      setValue(fieldName, v);
    },
    [fieldName, setValue],
  );

  return (
    <MarkdownEditor
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      autoComplete="off"
      disableUnderline
      fullWidth
      multiline
      placeholder="Введите текст..."
      setValue={setVal}
      sx={{ fontSize }}
      upload={upload}
    />
  );
});

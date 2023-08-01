import React, { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MarkdownEditor } from 'src/shared/components';

type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  created_at: string;
};

type Upload = (file: File) => Promise<FileType>;

type Props = {
  name: string;
  upload?: Upload;
  placeholder?: string;
  errorText?: string;
  hint?: string;
  helperText?: string;
  label?: string;
};

export const MarkdownField = memo(({ name, upload, ...restProps }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ name: string }, 'name'>({ name: name as 'name' });
  const { ref, ...fieldProps } = field;
  const { setValue } = useFormContext();
  const setVal = useCallback(
    (v: string) => {
      setValue(name, v);
    },
    [name, setValue],
  );

  return (
    <MarkdownEditor
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      autoComplete="off"
      disableUnderline
      errorText={error && error.message ? error.message : ''}
      fullWidth
      multiline
      setValue={setVal}
      sx={{ fontSize: '0.8125rem' }}
      upload={upload}
    />
  );
});

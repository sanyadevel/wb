import React, { memo, useCallback, useMemo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { MarkdownView } from 'src/shared/components';
import { FILE_TYPES } from 'src/constants';
import mime from 'mime';
import { useRecoilValue } from 'recoil';
import { isEqual } from 'lodash';
import { S3DndArea } from '../../../s3-dnd-area';
import { ErrorText } from '../../../error-text';
import { Struct, Value } from '../types';
import styles from './index.module.scss';
import { state } from '../state';

type Props = {
  fieldName: string;
  valueName: string;
};

export const View = memo(({ fieldName, valueName }: Props) => {
  const { upload } = useRecoilValue(state);

  const fieldProps: Struct = useWatch({ name: fieldName });
  const {
    field: { onChange },
    fieldState,
  } = useController<{ name: Value }, 'name'>({ name: valueName as 'name' });

  // именно отсюда берем value, а не из field.value, чтобы компонент был реактивным
  const value: Value = useWatch({ name: valueName });
  const handleOnChange = useCallback(
    (files: Value) => {
      if (!isEqual(value, files)) onChange(files);
    },
    [onChange, value],
  );

  const accept = useMemo(() => {
    const extList = fieldProps.fileExtensions.map(item => FILE_TYPES[item]).flat();
    const obj: Record<string, Array<string>> = {};
    extList.forEach(ext => {
      const mimeType = mime.getType(ext);
      if (mimeType) obj[mimeType] = [];
    });
    return obj;
  }, [fieldProps.fileExtensions]);

  return (
    <div className={styles.root}>
      {fieldProps.title.on && fieldProps.title.value && <MarkdownView value={fieldProps.title.value} />}
      {fieldProps.subtitle.on && fieldProps.title.value && <MarkdownView value={fieldProps.subtitle.value} />}
      <div>
        <S3DndArea
          accept={accept}
          hint={fieldProps.hint}
          initFiles={value}
          maxFiles={fieldProps.maxCount}
          maxSize={fieldProps.maxSize}
          onChange={handleOnChange}
          upload={upload}
        />
        {fieldState.error && fieldState.isTouched && <ErrorText>{fieldState.error.message}</ErrorText>}
      </div>
    </div>
  );
});

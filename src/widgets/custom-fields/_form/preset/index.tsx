import React, { memo, useCallback, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { isWebManifestDebug } from 'src/features';
import { FormBasis } from '../../form-basis';
import { ErrorBoundary } from '../../error-boundary';
import { useCopyFormToClipboard } from '../../_hooks';
import styles from './index.module.scss';
import { FieldList } from './components/field-list';
import { names } from '../names';
import { Header } from '../components';
import { FormType } from '../types';

type Props = {
  onSubmit?: () => void;
};

export const Preset = memo(({ onSubmit }: Props) => {
  const { trigger, setValue } = useFormContext<FormType>();
  // после первого рендера проводим валидацию что бы показать имеющиеся ошибки
  useEffect(() => {
    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const color: string = useWatch({ name: names.color });

  const copyToClipboard = useCopyFormToClipboard();

  const handleOnClick = useCallback(() => {
    setValue(names.focusedFieldIndex as any, -1);
  }, [setValue]);

  const focusedFieldIndex: number = useWatch({ name: names.focusedFieldIndex as any });
  const formSettings = focusedFieldIndex === -1;

  return (
    <FormBasis
      color={color}
      disableHover={formSettings}
      onClick={handleOnClick}
      onColorHeaderDoubleClick={isWebManifestDebug() ? copyToClipboard : undefined}
    >
      <div className={styles.root}>
        <Header />
        <ErrorBoundary errorText="Произошла ошибка">
          <FieldList />
        </ErrorBoundary>
      </div>
    </FormBasis>
  );
});

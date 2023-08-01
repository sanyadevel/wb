import React, { memo, PropsWithChildren } from 'react';
import { useWatch } from 'react-hook-form';
import { isWebManifestDebug } from 'src/features';
import { useCopyFormToClipboard } from '../../_hooks';
import { FormBasis } from '../../form-basis';
import { ErrorBoundary } from '../../error-boundary';
import { FormType } from '../types';
import { FieldList } from './components';
import styles from './index.module.scss';
import { names } from '../names';
import { Header } from '../components';

type Props = {};

export const View = memo(({ children }: PropsWithChildren<Props>) => {
  const color: FormType['color'] = useWatch({ name: names.color });

  const copyToClipboard = useCopyFormToClipboard();

  return (
    <FormBasis color={color} disableHover onColorHeaderDoubleClick={isWebManifestDebug() ? copyToClipboard : undefined}>
      <div className={styles.root}>
        <Header />
        <div className={styles.fields}>
          <ErrorBoundary errorText="Произошла ошибка">
            <FieldList />
            {children}
          </ErrorBoundary>
        </div>
      </div>
    </FormBasis>
  );
});

import React, { memo } from 'react';
import { form, FormType } from '../../../_form';
import { ErrorBoundary } from '../../../error-boundary';
import { SettingsMatcher } from '../settings-matcher';
import { SidebarLayout } from '../sidebar-layout';
import styles from './index.module.scss';
import { useChangeModeEffect, useFormWrapperRef, usePresetSubmitEffect, useTouchAllFieldsEffect } from './hooks';

type Props = {
  onSubmit: (data: FormType) => void;
};

export const FormEditorView = memo(({ onSubmit }: Props) => {
  const touched = useTouchAllFieldsEffect();

  usePresetSubmitEffect(onSubmit, touched);

  const ref = useFormWrapperRef();

  useChangeModeEffect();

  return (
    <div className={styles.root}>
      <div ref={ref} className={styles.formWrapper}>
        {/* <HookFormState /> */}
        <div className={styles.form}>
          <form.Preset />
        </div>
      </div>
      <SidebarLayout>
        <ErrorBoundary errorText="Произошла ошибка">
          <SettingsMatcher />
        </ErrorBoundary>
      </SidebarLayout>
    </div>
  );
});

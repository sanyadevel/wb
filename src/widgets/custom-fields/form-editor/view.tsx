import React, { FormEventHandler, memo, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetRecoilState } from 'recoil';
import { form } from '../_form';
import { Upload } from '../types';
import { FormEditorView } from './components';
import styles from './index.module.scss';
import { FormType } from '../_form/types';
import { ErrorBoundary } from '../error-boundary';
import { textField } from '../_fields';

type Props = {
  init: FormType;
  onSubmit: (data: FormType) => void;
  upload?: Upload;
};

export const FormEditor = memo(({ init, onSubmit, upload }: Props) => {
  const setTextFieldState = useSetRecoilState(textField.state);

  useEffect(() => {
    setTextFieldState({ upload });
  }, [setTextFieldState, upload]);

  const methods = useForm<FormType>({
    defaultValues: init,
    resolver: zodResolver(form.presetFormSchema, {}, { mode: 'sync' }),
    mode: 'all',
  });

  const handleOnSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      methods.handleSubmit(onSubmit)(event);
    },
    [methods, onSubmit],
  );

  return (
    <ErrorBoundary errorText="Произошла ошибка">
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.root} onSubmit={handleOnSubmit}>
          <FormEditorView onSubmit={onSubmit} />
        </form>
      </FormProvider>
    </ErrorBoundary>
  );
});

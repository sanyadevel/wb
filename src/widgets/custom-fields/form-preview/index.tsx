import React, { memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetRecoilState } from 'recoil';
import { form } from '../_form';
import { Upload } from '../types';
import styles from './index.module.scss';
import { FormType } from '../_form/types';
import { ErrorBoundary } from '../error-boundary';
import { uploadField } from '../_fields';

type Props = {
  init: FormType;
  upload?: Upload;
};

export const FormPreview = memo(({ init, upload }: Props) => {
  const setUploadFieldState = useSetRecoilState(uploadField.state);

  useEffect(() => {
    setUploadFieldState({ upload });
  }, [setUploadFieldState, upload]);

  const methods = useForm<FormType>({
    defaultValues: init,
    resolver: zodResolver(form.viewFormSchema, {}, { mode: 'sync' }),
    mode: 'all',
  });

  return (
    <ErrorBoundary errorText="Произошла ошибка">
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...methods}
      >
        <form className={styles.root} onSubmit={() => {}}>
          <form.View />
        </form>
      </FormProvider>
    </ErrorBoundary>
  );
});

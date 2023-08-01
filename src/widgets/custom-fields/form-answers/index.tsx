import React, { FormEventHandler, memo, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from '@mui/material';
import { forOwn } from 'lodash';
import { FORM_SAVING_INTERVAL } from 'src/constants';
import { useSetRecoilState } from 'recoil';
import { Button } from 'src/shared/components';
import { names } from '../_form/names';
import { Upload } from '../types';
import styles from './index.module.scss';
import { FormType, form } from '../_form';
import { uploadField, textField } from '../_fields';

type Props = {
  init: FormType;
  onSubmit: (data: FormType) => void;
  onSaveDraft?: (data: FormType) => void;
  upload?: Upload;
  isFilesLoading?: boolean;
};

export const FormAnswers = memo(({ init, onSubmit, onSaveDraft, upload, isFilesLoading }: Props) => {
  const setUploadFieldState = useSetRecoilState(uploadField.state);
  const setTextFieldState = useSetRecoilState(textField.state);

  useEffect(() => {
    setUploadFieldState({ upload });
    setTextFieldState({ upload });
  }, [setTextFieldState, setUploadFieldState, upload]);

  const methods = useForm<FormType>({
    defaultValues: init,
    resolver: zodResolver(form.viewFormSchema, {}, { mode: 'sync' }),
    mode: 'all',
  });

  const markFieldsAsTouched = useCallback(() => {
    const formValues = methods.getValues();
    forOwn(formValues.values, (value, key) => {
      methods.setValue(`${form.names.values._}.${key}` as any, value, { shouldTouch: true });
    });
  }, [methods]);

  useEffect(() => {
    markFieldsAsTouched();
  }, [markFieldsAsTouched]);

  const handleOnSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      methods.handleSubmit(onSubmit)(event);
    },
    [methods, onSubmit],
  );

  const handleOnViewSubmit = useCallback(() => {
    methods.handleSubmit(onSubmit)();
  }, [methods, onSubmit]);

  const clearForm = useCallback(() => {
    methods.setValue(names.values._ as any, form.getDefaultValues(methods.getValues().fields));
  }, [methods]);

  const handleOnPresetSubmit = useCallback(() => {
    if (onSaveDraft) onSaveDraft(methods.getValues());
  }, [methods, onSaveDraft]);

  useEffect(() => {
    const handleDebouncedOnSubmit = debounce(handleOnPresetSubmit, FORM_SAVING_INTERVAL);
    const subscription = methods.watch((value, info) => {
      handleDebouncedOnSubmit();
    });

    return () => subscription.unsubscribe();
  }, [handleOnPresetSubmit, methods]);

  return (
    <FormProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...methods}
    >
      <form className={styles.root} onSubmit={handleOnSubmit}>
        {/* <HookFormState /> */}
        <div className={styles.form}>
          <form.View key="view">
            <div className={styles.controls}>
              <Button fullWidth onClick={clearForm}>
                Очистить форму
              </Button>
              <Button disabled={isFilesLoading} fullWidth onClick={handleOnViewSubmit}>
                Отправить
              </Button>
            </div>
          </form.View>
        </div>
      </form>
    </FormProvider>
  );
});

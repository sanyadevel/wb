import { ArrowBack } from '@mui/icons-material';
import { Button, FormControl, Typography } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonWithLoader, ButtonWithTimeout, CodeMaskedInput } from 'src/shared/components';
import { formatPhone } from 'src/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './index.module.scss';

const formSchema = z.object({
  code: z.string().length(6),
});

export type CodeFormValues = z.infer<typeof formSchema>;

const codeInit: CodeFormValues = {
  code: '',
};

type Props = {
  sentPhone: string;
  resetToken: () => void;
  codeLength: number;
  timeAvailable: number;
  onSendPhone: (phone: string) => void;
  onSubmitCode: (code: CodeFormValues) => void;
};

export const CodeForm = memo(
  ({ sentPhone, resetToken, codeLength, timeAvailable, onSendPhone, onSubmitCode }: Props) => {
    const [key, setKey] = useState<number>(0);
    const codeMask = useMemo(() => '0'.repeat(codeLength), [codeLength]);

    const {
      register,
      setValue,
      getValues,
      formState: { isValid, isSubmitting },
      handleSubmit,
    } = useForm({ defaultValues: codeInit, resolver: zodResolver(formSchema, {}, { mode: 'sync' }) });

    const { ref, ...restCodeControllerProps } = register('code');

    useEffect(() => {
      setValue('code', codeInit.code);
    }, [setValue]);

    const getResendPhone = useCallback(
      () => () => {
        setValue('code', '');
        setKey(oldKey => oldKey + 1);
        onSendPhone(sentPhone);
      },
      [setValue, onSendPhone, sentPhone],
    );

    const onChange = useCallback(
      (event: any) => {
        setValue('code', event?.target?.value, { shouldValidate: true });
      },
      [setValue],
    );

    const onSubmitCodeHandler = useCallback(() => {
      onSubmitCode({ code: getValues('code') });

      // eslint-disable-next-line no-useless-return
      return;
    }, [onSubmitCode, getValues]);

    return (
      <form onSubmit={handleSubmit(onSubmitCodeHandler)}>
        <div className={styles.tools}>
          <Button color="primary" onClick={resetToken} startIcon={<ArrowBack />}>
            Вернуться назад
          </Button>
          <Typography variant="text">
            Код подтверждения был отправлен на номер <strong>{formatPhone(sentPhone)}</strong>
          </Typography>
        </div>

        <FormControl fullWidth>
          <CodeMaskedInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restCodeControllerProps}
            inputRef={ref}
            mask={codeMask}
            name="code"
            onChange={onChange}
          />
        </FormControl>

        <div className={styles.actionWrap}>
          <ButtonWithLoader disabled={!isValid} isLoading={isSubmitting}>
            Войти
          </ButtonWithLoader>
          <ButtonWithTimeout key={key} onClick={getResendPhone()} timeAvailable={timeAvailable} variant="text">
            Отправить повторно
          </ButtonWithTimeout>
        </div>
      </form>
    );
  },
);

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'src/libs/local-storage-manager';
import { phoneValidator } from 'src/shared/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ButtonWithLoader, PhoneMaskedInput } from 'src/shared/components';
import { Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import { PHONE_NUMBER_LENGTH, REQUIRED_FIELD } from '../../constant';
import styles from './index.module.scss';

const formSchema = z.object({
  phone: z.string().min(1, REQUIRED_FIELD).length(11, PHONE_NUMBER_LENGTH),
});

export type PhoneFormValues = z.infer<typeof formSchema>;

const mask = '0'.repeat(12);

const defaultValues: PhoneFormValues = {
  phone: '',
};

type Props = {
  onSendPhone: (phone: string) => void;
};

export const PhoneForm = memo(({ onSendPhone }: Props) => {
  const storage = useLocalStorage();
  const [isSavePhone, setIsSavePhone] = useState<boolean>(false);

  const {
    register,
    setValue,
    formState: { errors, touchedFields, isValid },
    handleSubmit,
  } = useForm({ defaultValues, resolver: zodResolver(formSchema, {}, { mode: 'sync' }) });

  const { ref, ...restPhoneControllerProps } = register('phone');

  const phoneInit = useMemo<PhoneFormValues>(() => {
    const validPhone = phoneValidator(storage.lastPreference.phoneNumber) === '';
    return { phone: storage.lastPreference.savePhone && validPhone ? storage.lastPreference.phoneNumber : '' };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue('phone', phoneInit.phone);
  }, [phoneInit, setValue]);

  useEffect(() => {
    const invalidPhone = phoneValidator(storage.lastPreference.phoneNumber) !== '';
    if (storage.lastPreference.savePhone && invalidPhone) {
      storage.lastPreference.savePhone = false;
    }

    setIsSavePhone(storage.lastPreference.savePhone);
  }, [storage.lastPreference]);

  const handleSubmitPhone = useCallback(
    ({ phone }: PhoneFormValues) => {
      if (storage.lastPreference.savePhone) {
        storage.lastPreference.phoneNumber = phone;
      }
      return onSendPhone(phone);
    },
    [onSendPhone, storage.lastPreference],
  );

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      storage.lastPreference.savePhone = checked;
      setIsSavePhone(checked);
    },
    [storage.lastPreference],
  );

  const onChange = useCallback(
    (event: any) => {
      setValue('phone', event?.target?.value, { shouldValidate: true });
    },
    [setValue],
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitPhone)}>
      <div>
        <FormControl fullWidth>
          <Typography className={styles.label} variant="subtext">
            Номер телефона
          </Typography>

          <PhoneMaskedInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restPhoneControllerProps}
            className={styles.input}
            errorText={errors.phone && touchedFields.phone ? errors.phone.message : undefined}
            inputRef={ref}
            mask={mask}
            name="phone"
            onChange={onChange}
          />
        </FormControl>
        <div className={styles.checkboxWrap}>
          <FormControlLabel
            control={<Checkbox checked={isSavePhone} onChange={onChangeHandler} />}
            label="Запомнить номер телефона"
          />
        </div>
        <div className={styles.actionWrap}>
          <ButtonWithLoader disabled={!isValid} fullWidth type="submit">
            Получить код
          </ButtonWithLoader>
        </div>
      </div>
    </form>
  );
});

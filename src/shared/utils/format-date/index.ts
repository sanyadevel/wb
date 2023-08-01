// eslint-disable-next-line import/no-duplicates
import { format, isValid } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ruLocale from 'date-fns/locale/ru';
import { getDateFromISOStringWithTimezone } from 'src/shared/utils/timezone-utils';

export const formatDateString = (
  date: string,
  dateFormat: string = 'd MMMM yyyy года в HH:mm',
  resetTimezone: boolean = false,
): string => {
  const d = resetTimezone ? getDateFromISOStringWithTimezone(date) : new Date(date);

  return isValid(d)
    ? format(d, dateFormat, {
        locale: ruLocale,
      })
    : date;
};

export const formatDate = (date: Date, dateFormat: string = 'd MMMM yyyy года в HH:mm'): string =>
  format(date, dateFormat, {
    locale: ruLocale,
  });

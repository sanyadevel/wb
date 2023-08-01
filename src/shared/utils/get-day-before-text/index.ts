import { pluralize } from '../pluralize';

export const getDayBeforeText = (n: number) => {
  if (n > 0) return `${n} ${pluralize(n, 'день', 'дня', 'дней')} назад`;

  if (n === 0) return 'сегодня';

  return 'Ошибка(отрицательное значение)';
};

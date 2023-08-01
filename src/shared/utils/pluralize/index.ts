export const pluralize = (count: number, form1: string, form234: string, form5: string): string => {
  const countAbs = Math.abs(count);

  if (countAbs % 10 === 1 && countAbs % 100 !== 11) {
    return form1;
  }

  if (countAbs % 10 >= 2 && countAbs % 10 <= 4 && (countAbs % 100 < 11 || countAbs % 100 > 19)) {
    return form234;
  }

  return form5;
};

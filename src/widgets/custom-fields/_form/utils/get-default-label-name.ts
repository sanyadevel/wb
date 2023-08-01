import { FieldsType } from '../../_types';

export const getDefaultLabelName = (fields: FieldsType): string => {
  const regex = /^Новое поле (\d+)$/gim;
  const labelList: Array<string> = fields.map((item: any) => item.label || '');
  let max = 0;
  labelList.forEach(item => {
    const result = item.matchAll(regex);
    const arrResult = Array.from(result);
    const figure = arrResult.length > 0 ? Number(arrResult[0][1]) : max;
    max = figure > max ? figure : max;
  });
  return `Новое поле ${max + 1}`;
};

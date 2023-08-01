import { mapValues } from 'lodash';
import { Format } from './types';

const initFormat: Record<Format, boolean> = {
  bold: false,
  italic: false,
  crossedOut: false,
  link: false,
  listBulleted: false,
  listNumbered: false,
};

export const getFormat = (list: Array<Format>) => {
  const newFormat = mapValues(initFormat, (_: boolean, k: Format) => list.includes(k)) as Record<Format, boolean>;
  return newFormat;
};

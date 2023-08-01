import { Value } from './types';

export const getDefaultValue = (multi: boolean): Value => (multi ? [] : '');

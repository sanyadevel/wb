import * as view from './view';
import * as preset from './preset';
import * as settings from './settings';
import * as init from './init';
import * as schema from './schema';
import * as utils from './utils';
import * as names from './names';

export * from './types';

export const form = { ...view, ...preset, ...settings, ...init, ...schema, ...utils, ...names };

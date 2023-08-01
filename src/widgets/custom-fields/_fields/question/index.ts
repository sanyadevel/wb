import * as preset from './preset';
import * as settings from './settings';
import * as settingsV2 from './settings-v2';
import * as view from './view';
import * as init from './init';
import * as schema from './schemas';
import * as typeGuards from './type-guards';
import * as defaultValue from './default-value';
import * as getValueSchema from './get-value-schema';
import * as tableView from './table-view';

import type { Variant as TVariant, Struct as TStruct, Value as TValue } from './types';

export namespace QuestionField {
  export type Variant = TVariant;
  export type Struct = TStruct;
  export type Value = TValue;
}

export const questionField = {
  ...preset,
  ...settings,
  ...settingsV2,
  ...view,
  ...init,
  ...schema,
  ...typeGuards,
  ...defaultValue,
  ...getValueSchema,
  ...tableView,
};

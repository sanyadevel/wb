import * as z from 'zod';
import { fieldValue } from '../_schemas/field-value';
import { fieldValues } from '../_schemas/field-values';
import { field } from '../_schemas/field';
import { fields } from '../_schemas/fields';
import { lenientField } from '../_schemas/lenient-field';
import { lenientFields } from '../_schemas/lenient-fields';

export type FieldValueType = z.infer<typeof fieldValue>;

export type FieldValuesType = z.infer<typeof fieldValues>;

export type FieldType = z.infer<typeof field>;

export type FieldTypeName = FieldType['type'];

export type FieldsType = z.infer<typeof fields>;

export type LenientFieldType = z.infer<typeof lenientField>;

export type LenientFieldsType = z.infer<typeof lenientFields>;

export type FieldNames = FieldType['type'];

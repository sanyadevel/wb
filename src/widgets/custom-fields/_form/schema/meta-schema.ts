import { REQUIRED_FIELD, TOO_SHORT_NAME, TOO_LONG_NAME, MIN_NAME_LENGTH, MAX_NAME_LENGTH } from 'src/constants';
import * as z from 'zod';

export const metaSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, TOO_SHORT_NAME).max(MAX_NAME_LENGTH, TOO_LONG_NAME),
  description: z.string(),
  expiration: z.object({ on: z.boolean(), date: z.string(), time: z.string() }).strict(),
  replyLimit: z.object({ on: z.boolean(), participants: z.number(), replies: z.number() }).strict(),
  password: z.object({ on: z.boolean(), value: z.string() }).strict(),
  endingPage: z
    .object({
      title: z.string().min(1, REQUIRED_FIELD),
      text: z.string().min(1, REQUIRED_FIELD),
    })
    .strict(),
  answers: z
    .object({
      multiple: z.boolean(),
      anonymous: z.boolean(),
      needEmail: z.boolean(),
      editable: z.boolean(),
    })
    .strict(),
  color: z.string(),
});

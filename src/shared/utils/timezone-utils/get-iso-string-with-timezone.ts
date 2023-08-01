import { resetTimezone } from './reset-timezone';

export const getISOStringWithTimezone = (date: Date): string => resetTimezone(date).toISOString();

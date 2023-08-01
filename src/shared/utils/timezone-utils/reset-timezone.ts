// в date приходит 00:00:00 и с учетом смещения таймзоны в toISOString получается вчерашний день
export const resetTimezone = (date: Date): Date => new Date(date.getTime() - date.getTimezoneOffset() * 60000);

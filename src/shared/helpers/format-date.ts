import dayjs from 'dayjs';

export const formatDateInput = (date: Date | string) =>
    dayjs(date).format('DD.MM.YYYY');

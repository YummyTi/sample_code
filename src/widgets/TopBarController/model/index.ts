import dayjs from 'dayjs';
import produce from 'immer';
import {ChangeEvent} from 'react';
import create from 'zustand';

interface IDateTime {
    date: Date | string;
    setDate: (date: Date | string) => void;
    time: {from: string; to: string};
    setTime: (e: ChangeEvent<HTMLInputElement>) => void;
    setDefault: () => void;
}

export const useDateTimeModel = create<IDateTime>((set) => ({
    date: dayjs().subtract(1, 'day').toDate(),
    time: {from: '00:00', to: '23:59'},
    setDate: (date) => set({date}),
    setTime: (e) =>
        set(
            produce((draft: IDateTime) => {
                draft.time[e.target.name as 'from' | 'to'] = e.target.value;
            }),
        ),
    setDefault: () =>
        set({
            date: dayjs().subtract(1, 'day').toDate(),
            time: {from: '00:00', to: '23:59'},
        }),
}));

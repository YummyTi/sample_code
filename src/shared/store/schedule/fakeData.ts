export interface IDays {
    day: string;
    race: number;
    exit: string;
    comeback: string;
    time: string;
    busStop: string;
    timeEnd: string;
    busStopEnd: string;
    simple: string;
    interval: string;
    lunchFrom: string;
    lunchTo: string;
    busLunchStop: string;
    dinnerFrom: string;
    dinnerhTo: string;
    busDinnerStop: string;
}

export interface IBusSchedule {
    id: number;
    days: IDays[];
}

export interface INewData extends IDays {
    id: number;
}

export const origData: IBusSchedule[] = [
    {
        id: 1,
        days: [
            {
                day: 'ПН',
                race: 16,
                exit: '6:05',
                comeback: '22:15',
                time: '6:20',
                busStop: 'ТТЗ АШБ',
                timeEnd: '22:20',
                busStopEnd: 'Гуллола кўчаси',
                simple: '5 мин',
                interval: '15 мин',
                lunchFrom: '11:05',
                lunchTo: '11:45',
                busLunchStop: 'ТТЗ АШБ',
                dinnerFrom: '17:05',
                dinnerhTo: '17:45',
                busDinnerStop: 'ТТЗ АШБ',
            },
            {
                day: 'Вт-Пт',
                race: 18,
                exit: '5:05',
                comeback: '22:20',
                time: '6:30',
                busStop: 'Чорсу',
                timeEnd: '22:00',
                busStopEnd: 'Чорсу',
                simple: '10 мин',
                interval: '15 мин',
                lunchFrom: '11:05',
                lunchTo: '11:45',
                busLunchStop: 'Чорсу',
                dinnerFrom: '17:25',
                dinnerhTo: '17:45',
                busDinnerStop: 'Чорсу',
            },
            {
                day: 'Сб',
                race: 14,
                exit: '5:45',
                comeback: '22:25',
                time: '6:35',
                busStop: 'Ётоқхона',
                timeEnd: '22:12',
                busStopEnd: 'Ётоқхона',
                simple: '10 мин',
                interval: '15 мин',
                lunchFrom: '11:05',
                lunchTo: '11:45',
                busLunchStop: 'Ётоқхона',
                dinnerFrom: '17:25',
                dinnerhTo: '17:45',
                busDinnerStop: 'Ётоқхона',
            },
            {
                day: 'Вс',
                race: 12,
                exit: '7:15',
                comeback: '22:30',
                time: '5:55',
                busStop: 'Гуллола кўчаси',
                timeEnd: '22:36',
                busStopEnd: 'ТТЗ АШБ',
                simple: '10 мин',
                interval: '15 мин',
                lunchFrom: '11:05',
                lunchTo: '11:45',
                busLunchStop: 'Гуллола кўчаси',
                dinnerFrom: '17:25',
                dinnerhTo: '17:45',
                busDinnerStop: 'ТТЗ АШБ',
            },
        ],
    },
];

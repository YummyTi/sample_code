export const parseHour = (time: string) => {
    const timeLength = time?.length;
    let parseTime = time;
    if (timeLength === 5) {
        parseTime = time + ':00';
    }
    return parseTime;
};

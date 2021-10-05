export enum WeekDayEnum {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const getWeekDay = (date: Date): WeekDayEnum => {
  const day = date.getDay();
  const lookup = {
    0: WeekDayEnum.Sunday,
    1: WeekDayEnum.Monday,
    2: WeekDayEnum.Tuesday,
    3: WeekDayEnum.Wednesday,
    4: WeekDayEnum.Thursday,
    5: WeekDayEnum.Friday,
    6: WeekDayEnum.Saturday,
  };

  return lookup[day];
};

export const humanDuration = (duration: string): string => {
  const [h, m] = duration.split(':');

  return `${Number(h)}hrs. ${m}min`;
};

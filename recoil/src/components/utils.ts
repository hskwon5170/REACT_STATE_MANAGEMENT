export const pad = (time: number): string => {
  return `0${time}`.slice(-2);
};

export const getSimpleDateFormat = (
  d: Date,
  separator: string = "-"
): string => {
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
    separator
  );
};

export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const clacMonth = (d: Date, num: number): Date => {
  let date = new Date();

  date.setMonth(d.getMonth() + num);

  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month, num > 0 ? 1 : 0);
};

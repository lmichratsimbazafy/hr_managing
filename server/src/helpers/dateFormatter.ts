export class DateFormatterHelpers {
  static dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  static stringToDate = (stringDate: string): Date => {
    return new Date(stringDate);
  };
}

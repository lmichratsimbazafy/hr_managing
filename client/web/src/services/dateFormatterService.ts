import moment from "moment";
export class DateFormatterService {
  static dateToString = (date: Date): string => {
    return moment.utc(date).locale("fr").format("DD MMMM YYYY");
  };
}

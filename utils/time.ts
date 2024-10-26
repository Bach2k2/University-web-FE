import moment from "moment/moment";
export const FORMAT = {
  DATE: "YYYY-MM-DD",
  DATE_TIME: "YYYY-MM-DD hh:mm:ss",
};
export function formatDate(value, format = null) {
  if (!value) {
    return null;
  }
  if (format) {
    return moment(String(value)).format(format);
  }
  return moment(String(value)).format(FORMAT.DATE);
}

export function formatDateTimeFullScript(value: string, language: string) {
  if (!value) {
    return null;
  }

  const [day, month, year] = value.split("/");
  if (language.toLocaleLowerCase() == "vn")
    return `Ngày ${day} Tháng ${month} năm ${year}`;
  else {
    return value;
  }
}

export function utcToLocalDateTime(value, format = null) {
  if (!value) {
    return null;
  }
  if (format) {
    return moment(moment.utc(value)).local().format(format);
  }
  return moment(moment.utc(value)).local().format(FORMAT.DATE_TIME);
}

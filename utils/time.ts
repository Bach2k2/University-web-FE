// import moment from "moment/moment";

export const FORMAT = {
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATE_TIME: "YYYY-MM-DD HH:mm:ss",
};

// export function formatDate(value: any, format: string | null = null) {
//   if (!value) {
//     return null;
//   }
//   if (format) {
//     return moment(String(value)).format(format);
//   }
//   return moment(String(value)).format(FORMAT.DATE);
// }

// export function formatDateTime(value: any, format: string | null = null, utc = true) {
//   if (!value) {
//     return null;
//   }
  
//   const momentValue = utc ? moment.utc(value) : moment(value);
  
//   if (format) {
//     return momentValue.format(format);
//   }
  
//   return momentValue.format('YYYY-MM-DD HH:mm:ss'); // Default format if no format is provided
// }

export function getCurrentDateTime(format: string | null = null, utc = true) {
  const currentMoment = utc ? moment.utc() : moment();
  
  if (format) {
    return currentMoment.format(format);
  }
  
  return currentMoment.format('YYYY-MM-DD HH:mm:ss'); // Default format if no format is provided
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

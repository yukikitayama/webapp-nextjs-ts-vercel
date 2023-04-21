// Get date at 00:00:00 in local timezone
export const getDefaultDate = (days: number) => {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  date.setHours(0, 0, 0, 0);
  return date;
};

// When using toISOString() to extract date string, it can give us the next day
// This function gives us a date in the local timezone from ISOString
export const getLocalDateFromDatetime = (datetime: Date) => {
  // datetime is UTC
  const offset = datetime.getTimezoneOffset();
  // shiftedDatetime is a temporary datetime shifted by the difference between UTC and local timezone
  const shiftedDatetime = new Date(datetime.getTime() - offset * 60 * 1000);
  // shiftedDatetime is not the true time, but toISOString().split("T")[0] has a correct date in local timezone
  return shiftedDatetime.toISOString().split("T")[0];
};

export const getDatetimeFromLocalDate = (date: string) => {
  // new Date("YYYY-MM-DD") reads it as UTC YYYY-MM-DD 0 hour
  const timezoneOffset = new Date(date).getTimezoneOffset();
  const localDate = new Date(
    new Date(date).getTime() + timezoneOffset * 60 * 1000
  );
  return localDate;
};
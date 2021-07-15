const DATE_MONTH_LENGTH = 2;
function getMonthAndDay(date) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate());
  const month = String(dateObj.getMonth() + 1);
  const year = String(dateObj.getFullYear());
  return `${day.padStart(DATE_MONTH_LENGTH, '0')}.${month.padStart(DATE_MONTH_LENGTH, '0')}.${year}`;
}

export default getMonthAndDay;

const DATE_MONTH_LENGTH = 2;
function getMonthAndDay(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().padStart(DATE_MONTH_LENGTH, '0');
  const month = dateObj.getMonth().padStart(DATE_MONTH_LENGTH, '0');
  return `${day}.${month}.`;
}

export default getMonthAndDay;

export const getMonthStart = () => {
  const today = new Date(Date.now());

  const formattedMonth = today.toLocaleDateString('en-GB', {
    month: '2-digit'
  });

  return `${formattedMonth}-01-${today.getFullYear()}`;
};

export const formatDate = (value) => {
  const formattedDate = value.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('.');

  return `${formattedDate}`;
};

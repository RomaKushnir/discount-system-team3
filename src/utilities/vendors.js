export const convertFilterParametersToUrl = (params) => {
  console.log(params);
  const {
    sort, pageNumber, size, totalElements, totalPages, ...query
  } = params;

  console.log(totalElements, totalPages);

  const str = Object.keys(query)
    .filter((el) => query[el] !== null && query[el] !== '')
    .map((key) => `${key}:${encodeURIComponent(query[key])}`)
    .join(';')
    .split('_')
    .join('.')
    .replace('country:', 'location.country:')
    .replace('city:', 'location.city:')
    .replace('title:', 'title*:*')
    .replace('description:', 'description*:*');

  console.log(str);
  const queryParams = `?query=${str};`;
  const sortParams = `&sort=title,${sort}`;
  const paginationParams = `&page=${pageNumber}&size=${size}`;
  const searchParams = `${queryParams}${sortParams}${paginationParams}`;

  console.log(queryParams);
  console.log(sortParams);
  console.log(paginationParams);

  return searchParams;
};

export const convertUrlToFilterParameters = (params) => {
  console.log(params);
};

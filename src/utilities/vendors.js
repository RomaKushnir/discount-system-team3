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
    .replace('country:', 'location.country:')
    .replace('city:', 'location.city:')
    .replace('title:', 'title*:*')
    .replace('description:', 'description*:*');

  const queryParams = `?query=${str};`;
  const sortParams = `&sort=title,${sort}`;
  const paginationParams = `&page=${pageNumber}&size=${size}`;
  const searchParams = `${queryParams}${sortParams}${paginationParams}`;

  return searchParams;
};

export const convertUrlToFilterParameters = (queryString) => {
  const modifiedString = queryString
    .replace('description*:*', 'description:')
    .replace('title*:*', 'title:')
    .replace('location.city:', 'city:')
    .replace('location.country:', 'country:')
    .replace('page', 'pageNumber:')
    .replace('?query=', '')
    .replace('&sort=title,', 'sort:')
    .replace('&', ';')
    .replace('&size=', ';size:')
    .replace('=', ':')
    .split(';');

  const queryParamsObject = modifiedString.reduce((acc, el) => {
    const [key, value] = el.split(':');
    console.log(key, value);
    acc[key] = value;
    return acc;
  }, {});

  console.log(queryParamsObject);

  return queryParamsObject;
};

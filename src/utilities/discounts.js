export const convertFilterParametersToUrl = (params) => {
  const {
    sort, pageNumber, size, totalElements, totalPages, ...query
  } = params;

  const str = Object.keys(query)
    .filter((el) => query[el] !== null && query[el] !== '')
    .map((key) => `${key}:${encodeURIComponent(query[key])}`)
    .join(';')
    .replace('country:', 'locations.country:')
    .replace('city:', 'locations.city:')
    .replace('title:', 'vendor.title*:*')
    .replace('shortDescription:', 'shortDescription*:*')
    .replace('category:', 'category.id:');

  const queryParams = `?query=${str};`;
  const sortParams = `&sort=${sort}`;
  const paginationParams = `&page=${pageNumber}&size=${size}`;

  return { queryParams, sortParams, paginationParams };
};

export const convertUrlToFilterParameters = (queryString) => {
  const modifiedString = queryString
    .replace('shortDescription*:*', 'shortDescription:')
    .replace('vendor.title*:*', 'title:')
    .replace('locations.city:', 'city:')
    .replace('locations.country:', 'country:')
    .replace('category.id:', 'category:')
    .replace('?query=', '')
    .replace('&sort=title,', 'sort:')
    .replace('&', ';')
    .replace('=', ':')
    .split(';');

  const queryParamsObject = modifiedString.reduce((acc, el) => {
    const [key, value] = el.split(':');
    if (key) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return queryParamsObject;
};

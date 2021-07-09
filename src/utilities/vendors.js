export const convertFilterParametersToUrl = (params) => {
  const {
    sort, pageNumber, size, totalElements, totalPages, ...query
  } = params;

  const str = Object.keys(query)
    .filter((el) => query[el] !== null && query[el] !== '')
    .map((key) => `${key}:${encodeURIComponent(query[key])}`)
    .join(';')
    .replace('country:', 'location.country.countryCode:')
    .replace('city:', 'location.city:')
    .replace('vendorTitle:', 'title*:*')
    .replace('description:', 'description*:*')
    .replace('category:', 'discounts.category.id:');

  const queryParams = `?query=${str};`;
  const sortParams = `&sort=title,${sort}`;
  const paginationParams = `&page=${pageNumber}&size=${size}`;

  return { queryParams, sortParams, paginationParams };
};

export const convertUrlToFilterParameters = (queryString) => {
  const modifiedString = queryString
    .replace('description*:*', 'description:')
    .replace('title*:*', 'vendorTitle:')
    .replace('location.city:', 'city:')
    .replace('location.country.countryCode:', 'country:')
    .replace('discounts.category.id:', 'category:')
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

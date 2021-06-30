// import {
//   useCallback,
//   useState,
//   useEffect
// } from 'react';
import { useSelector } from 'react-redux';
import { convertUrlToFilterParameters } from './vendors';

const useVendorsQueryChecker = (queryString) => {
  const queryObject = convertUrlToFilterParameters(queryString);
  // const vendorsFilters = useSelector((state) => state.vendorReducer.vendorsFilters);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const { totalElements, totalPages, ...pureFilters } = vendorsFiltersApplied;
  console.log(vendorsFiltersApplied);
  console.log(totalElements, totalPages);
  console.log(queryObject);
  console.log(pureFilters);
  console.log(queryObject.page);
  const x = Object.entries(pureFilters).map(([key, value]) => {
    let array = [];

    if (pureFilters[key] !== null) {
      console.log(value, queryObject[key]);
      array = array.push(value.toString() === queryObject[key]);
      console.log(array);
    }
    return array;
  });

  // console.log(vendorsFilters);

  console.log(x);
};

export default useVendorsQueryChecker;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertUrlToFilterParameters } from './vendors';
import * as actions from '../store/actions';

const useVendorsQueryChecker = (queryString) => {
  const dispatch = useDispatch();
  const queryObject = convertUrlToFilterParameters(queryString);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const { totalElements, totalPages, ...pureFilters } = vendorsFiltersApplied;
  console.log('*********************************');
  console.log('vendorsFiltersApplied', vendorsFiltersApplied);
  console.log('queryObject', queryObject);
  console.log('pureFilters', pureFilters);

  const checkArray = Object.entries(queryObject)

    .map(([key, value]) => {
      let array = [];

      if (queryObject[key] !== null) {
        console.log(value, pureFilters[key]);
        // eslint-disable-next-line
        console.log(value == pureFilters[key]);
        // eslint-disable-next-line
        array = array.concat(value == pureFilters[key]).join(',');
      }
      return array;
    });

  console.log(checkArray);

  useEffect(() => {
    const showMore = false;
    dispatch(actions.vendorActions.clearGetVendorsStatus());

    if (checkArray.includes('false')) {
      dispatch(actions.vendorActions.updateVendorsFilters(queryObject));
    }

    dispatch(actions.vendorActions.applyVendorsFilters(showMore));
    // eslint-disable-next-line
  }, []);
};

export default useVendorsQueryChecker;

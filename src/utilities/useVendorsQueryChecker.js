import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertUrlToFilterParameters } from './vendors';
import * as actions from '../store/actions';

const useVendorsQueryChecker = (queryString) => {
  const dispatch = useDispatch();
  const queryObject = convertUrlToFilterParameters(queryString);
  const vendorsFilters = useSelector((state) => state.vendorReducer.vendorsFilters);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const { totalElements, totalPages, ...pureFilters } = vendorsFiltersApplied;
  console.log('*********************************');
  console.log('vendorsFiltersApplied', vendorsFiltersApplied);
  console.log('queryObject', queryObject);
  console.log('pureFilters', pureFilters);

  const checkArray = Object.entries(pureFilters)
  // .filter(([, value]) => value !== null)

    .map(([key, value]) => {
      let array = [];

      if (pureFilters[key] !== null) {
        console.log(value.toString(), queryObject[key]);
        console.log(value.toString() === queryObject[key]);

        array = array.concat(value.toString() === queryObject[key]).join(',');
      }
      return array;
    });

  console.log(checkArray);

  useEffect(() => {
    const showMore = false;

    console.log('USE EFFECT TO APPLY FILTERS 1');
    dispatch(actions.vendorActions.clearGetVendorsStatus());

    if (checkArray.includes('false')) {
      // const showMore = false;
      console.log('UPDATE FILTERS');
      dispatch(actions.vendorActions.updateVendorsFilters(queryObject));
      console.log('vendorsFilters', vendorsFilters);
    }

    console.log('USE EFFECT TO APPLY FILTERS 2');
    console.log('vendorsFilters', vendorsFilters);

    dispatch(actions.vendorActions.applyVendorsFilters(showMore));
    // eslint-disable-next-line
  }, []);
};

export default useVendorsQueryChecker;

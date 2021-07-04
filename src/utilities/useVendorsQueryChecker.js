import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertUrlToFilterParameters, convertFilterParametersToUrl } from './vendors';
import * as actions from '../store/actions';
import history from '../history';

const useVendorsQueryChecker = () => {
  const dispatch = useDispatch();
  const [urlQueryString, setUrlQueryString] = useState(history.location.search);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const appliedFiltersQueryString = convertFilterParametersToUrl(vendorsFiltersApplied);

  const { queryParams, sortParams } = appliedFiltersQueryString;

  const querySortParams = `${queryParams}${sortParams}`;

  useEffect(() => {
    let isSubscribed = true;
    history.listen((location) => {
      if (isSubscribed) setUrlQueryString(location.search);
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (urlQueryString !== querySortParams) {
      const urlFilters = convertUrlToFilterParameters(urlQueryString);
      dispatch(actions.vendorActions.clearVendorsFilters());
      dispatch(actions.vendorActions.updateVendorsFilters(urlFilters));
      dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: false }));
    }
    // eslint-disable-next-line
  }, [urlQueryString]);

};

export default useVendorsQueryChecker;

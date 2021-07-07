import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertUrlToFilterParameters, convertFilterParametersToUrl } from './discounts';
import * as actions from '../store/actions';
import history from '../history';

const useDiscountsQueryChecker = () => {
  const dispatch = useDispatch();
  const [urlQueryString, setUrlQueryString] = useState(history.location.search);
  const discountsFiltersApplied = useSelector((state) => state.discountsReducer.discountsFiltersApplied);
  const appliedFiltersQueryString = convertFilterParametersToUrl(discountsFiltersApplied);

  const { queryParams, sortParams } = appliedFiltersQueryString;

  const querySortParams = `${queryParams}${sortParams}`;

  useEffect(() => {
    let isSubscribed = true;
    history.listen((location) => {
      if (isSubscribed) setUrlQueryString(location.search);
      console.log(location);
    });

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line
  }, []);

  console.log(urlQueryString, querySortParams);
  console.log(window.location.pathname);
  console.log(window.location.pathname === '/discounts');
  console.log(urlQueryString !== querySortParams);
  console.log(window.location.pathname === '/discounts' && urlQueryString !== querySortParams);

  useEffect(() => {
    if (urlQueryString !== querySortParams) {
      console.log('IF********');
      const urlFilters = convertUrlToFilterParameters(urlQueryString);
      console.log(urlFilters);
      dispatch(actions.discountsActions.clearDiscountsFilters());
      dispatch(actions.discountsActions.updateDiscountsFilters(urlFilters));
      dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: false }));
    } else {
      console.log('ELSE');
      dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: false }));
    }

    // eslint-disable-next-line
  }, [urlQueryString]);

};

export default useDiscountsQueryChecker;

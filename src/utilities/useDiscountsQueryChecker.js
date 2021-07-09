import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { convertUrlToFilterParameters, convertFilterParametersToUrl } from './discounts';
import * as actions from '../store/actions';

const useDiscountsQueryChecker = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const discountsFiltersApplied = useSelector((state) => state.discountsReducer.discountsFiltersApplied);
  const appliedFiltersQueryString = convertFilterParametersToUrl(discountsFiltersApplied);

  const { queryParams, sortParams } = appliedFiltersQueryString;

  const querySortParams = `${queryParams}${sortParams}`;

  useEffect(() => {
    if (location.search !== querySortParams) {
      const urlFilters = convertUrlToFilterParameters(location.search);
      dispatch(actions.discountsActions.clearDiscountsFilters());
      dispatch(actions.discountsActions.updateDiscountsFilters(urlFilters));
      dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: false }));
    } else {
      dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: false }));
    }

    // eslint-disable-next-line
  }, [location.search]);

};

export default useDiscountsQueryChecker;

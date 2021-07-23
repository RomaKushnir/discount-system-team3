import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { convertUrlToFilterParameters, convertFilterParametersToUrl } from './vendors';
import * as actions from '../store/actions';

const useVendorsQueryChecker = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const appliedFiltersQueryString = convertFilterParametersToUrl(vendorsFiltersApplied);
  const user = useSelector((state) => state.userReducer.user);

  const { queryParams, sortParams } = appliedFiltersQueryString;

  const querySortParams = `${queryParams}${sortParams}`;

  const vendorVisit = localStorage.getItem('vendorVisit');

  useEffect(() => {
    if (location.search !== querySortParams) {
      const urlFilters = convertUrlToFilterParameters(location.search);
      dispatch(actions.vendorActions.clearVendorsFilters());

      if (!vendorVisit) {
        dispatch(actions.vendorActions.updateVendorsFilters({ country: user?.location.countryCode }));
        dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: true }));
        localStorage.setItem('vendorVisit', 'true');
      } else {
        dispatch(actions.vendorActions.updateVendorsFilters(urlFilters));
        dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: false }));
      }
    } else {
      dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: false }));
    }

    // eslint-disable-next-line
  }, [location.search, user]);

};

export default useVendorsQueryChecker;

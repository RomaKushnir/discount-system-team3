import {
  useCallback,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import styles from './Vendors.module.scss';
import Modal from '../../components/Modal';
import AddVendorModal from './components/AddVendor';
import VendorsList from './components/VendorsList';
import * as actions from '../../store/actions';
import PageWrapper from '../../components/PageWrapper';
import FiltersContainer from '../../components/FiltersContainer';
import AddNewItemButton from '../../components/AddNewItemButton';
import { vendorsSortOptions } from '../../utilities/sortOptions';
import Pagination from '../../components/Pagination/Pagination';
import { getVendorsList } from '../../store/selectors';
import useVendorsQueryChecker from '../../utilities/useVendorsQueryChecker';
import isAdmin from '../../utilities/isAdmin';
import Vocabulary from '../../translations/vocabulary';

function Vendors() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState(null);
  const vendors = useSelector(getVendorsList);
  const getVendorsStatus = useSelector((state) => state.vendorReducer.getVendorsStatus);
  const vendorsFiltersApplied = useSelector((state) => state.vendorReducer.vendorsFiltersApplied);
  const vendorsFilters = useSelector((state) => state.vendorReducer.vendorsFilters);
  const user = useSelector((state) => state.userReducer.user);
  const addVendorModalStatus = useSelector((state) => state.vendorReducer.addVendorModalStatus);

  useEffect(() => {
    dispatch(actions.locationActions.getCountries());
    dispatch(actions.categoryActions.getCategories());
    dispatch(actions.locationActions.getCities(vendorsFilters.country));
    // eslint-disable-next-line
  }, []);

  useVendorsQueryChecker();

  const onModalOpen = useCallback((e, id) => {
    dispatch(actions.vendorActions.addVendorModalStatus(true));
    dispatch(actions.locationActions.getLocationsList());

    if (e.target.name === 'edit') {
      const selectedVendor = vendors.find((el) => el.id === id);
      setVendor(selectedVendor);
    } else {
      setVendor({
        title: '',
        locations: [],
        email: '',
        imageUrl: '',
        description: ''
      });
    }
  }, [dispatch, vendors]);

  const onDelete = useCallback((id) => {
    dispatch(actions.vendorActions.clearDeleteVendorStatus());
    dispatch(actions.vendorActions.deleteVendor(id));
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(actions.vendorActions.addVendorModalStatus(false));
  }, [dispatch]);

  const onChangeCountry = (selectedCountry) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ country: selectedCountry?.countryCode || null }));
    dispatch(actions.vendorActions.updateVendorsFilters({ city: null }));
    dispatch(actions.locationActions.getCities(selectedCountry?.countryCode));
  };

  const onChangeCity = (city) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ city: city?.label || null }));
  };

  const onChangeCategory = (category) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ category: category?.id || null }));
  };

  const onVendorSelectOptionChange = (selectedVendor) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ vendorTitle: selectedVendor?.label || '' }));
  };

  const onSearchInputChange = (descriptionSearchWord) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ description: descriptionSearchWord }));
  };

  const onSortFilterChange = (selectedOption) => {
    dispatch(actions.vendorActions.updateVendorsFilters({ sort: selectedOption?.value || null }));
  };

  const onApplyButtonClick = () => {
    dispatch(actions.vendorActions.clearGetVendorsStatus());
    dispatch(actions.vendorActions.applyVendorsFilters({ showMore: false, rewriteUrl: true }));
  };

  const onShowMoreClick = () => {
    if (vendorsFiltersApplied.pageNumber < vendorsFiltersApplied.totalPages) {
      dispatch(actions.vendorActions.updateVendorsFilters({ pageNumber: vendorsFilters.pageNumber += 1 }));
      dispatch(actions.vendorActions.applyVendorsFilters({ showMore: true, rewriteUrl: false }));
    }
  };

  return (
<PageWrapper>
  <div className={styles.contentWrapper}>
      <FiltersContainer
        onApplyButtonClick={onApplyButtonClick}
        onChangeCountry = {onChangeCountry}
        onChangeCity = {onChangeCity}
        onChangeCategory = {onChangeCategory}
        onVendorSelectOptionChange = {onVendorSelectOptionChange}
        onSearchInputChange = {onSearchInputChange}
        filters = {vendorsFilters}
        sortOptions ={vendorsSortOptions}
        onSortFilterChange = {onSortFilterChange}
      />
      <div className={styles.vendorsActionsBlock}>
        {isAdmin(user) && <AddNewItemButton
          btnTitle={t(Vocabulary.ADD_NEW_VENDOR)}
          onAddNewItem={onModalOpen}
          name = "add"
        />}
      </div>
      <Modal isOpen={addVendorModalStatus} onClose={closeModal}>
        <AddVendorModal
          selectedVendor = {vendor}
        />
      </Modal>
        <div>
          <>
            <VendorsList
              vendors={vendors}
              onEdit = {onModalOpen}
              onDelete = {onDelete}
            />
            {getVendorsStatus.loading === true
              && <div className = {styles.loadingContainer}>
              <CircularProgress />
            </div>}
            {vendorsFiltersApplied.pageNumber + 1 < vendorsFiltersApplied.totalPages
              && <Pagination btnTitle={t(Vocabulary.SHOW_MORE)}onShowMoreClick={onShowMoreClick} />}
          </>
      </div>
    </div>
  </PageWrapper>

  );
}

export default Vendors;

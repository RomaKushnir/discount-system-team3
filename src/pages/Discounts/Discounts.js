import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../store/actions';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import PageWrapper from '../../components/PageWrapper';
import DiscountList from './components/DiscountList';
import AddNewItemButton from '../../components/AddNewItemButton';
import Modal from '../../components/Modal';
import CreateDiscount from './components/CreateDiscount';
import { getDiscountsList } from '../../store/selectors';
import { discountsSortOptions } from '../../utilities/sortOptions';
import DiscountModal from './components/DiscountModal';
import Pagination from '../../components/Pagination/Pagination';
import isAdmin from '../../utilities/isAdmin';
import useDiscountsQueryChecker from '../../utilities/useDiscountsQueryChecker';

function Discounts() {
  // mock data for favourite discounts
  const favourite = [];

  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    dispatch(actions.locationActions.getLocationsList());
    dispatch(actions.categoryActions.getCategories());
    // dispatch(actions.locationActions.getCountries());
  }, [dispatch]);

  useDiscountsQueryChecker();

  const getDiscountsStatus = useSelector((state) => state.discountsReducer.getDiscountsStatus);
  const discountsArray = useSelector(getDiscountsList);
  const discountsFilters = useSelector((state) => state.discountsReducer.discountsFilters);
  const discountsFiltersApplied = useSelector((state) => state.discountsReducer.discountsFiltersApplied);
  const user = useSelector((state) => state.userReducer.user);
  // const getCountries = useSelector((state) => state.locationReducer.countries);

  useEffect(() => {
    dispatch(actions.locationActions.getCountries());
    dispatch(actions.categoryActions.getCategories());
    dispatch(actions.locationActions.getCities(discountsFilters.country));
    // eslint-disable-next-line
  }, []);

  useDiscountsQueryChecker();

  const onModalOpen = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  },
  [setModalState]);

  const onChangeCountry = (selectedCountry) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ country: selectedCountry?.countryCode || null }));
    dispatch(actions.locationActions.getCities(selectedCountry?.countryCode));
  };

  const onChangeCity = (city) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ city: city?.label || null }));
  };

  const onChangeCategory = (category) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ category: category?.id || null }));
  };

  const onVendorSelectOptionChange = (selectedVendor) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ vendorTitle: selectedVendor?.label || '' }));
  };
  const onSearchInputChange = (descriptionSearchWord) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({
      shortDescription: descriptionSearchWord
    }));
  };

  const onSortFilterChange = (selectedOption) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ sort: selectedOption?.value || null }));
  };

  const onApplyButtonClick = () => {
    dispatch(actions.discountsActions.clearGetDiscountsStatus());
    dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: false, rewriteUrl: true }));
  };

  const onShowMoreClick = () => {
    if (discountsFiltersApplied.pageNumber < discountsFiltersApplied.totalPages) {
      dispatch(actions.discountsActions.updateDiscountsFilters({ pageNumber: discountsFilters.pageNumber += 1 }));
      dispatch(actions.discountsActions.applyDiscountsFilters({ showMore: true, rewriteUrl: false }));
    }
  };
  const onCardClick = useCallback((e, id) => {
    setIsDiscountModalShown(true);
    const selectedDiscount = discountsArray.find((el) => el.id === id);
    setDiscount(selectedDiscount);
  }, [discountsArray]);

  const onDiscountModalClose = () => {
    setIsDiscountModalShown(false);
  };

  const onDeleteDiscount = useCallback((id) => {
    dispatch(actions.discountsActions.clearDeleteDiscountStatus());
    dispatch(actions.discountsActions.deleteDiscount(id));
    onDiscountModalClose();
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className={styles.contentWrapper}>
          <FiltersContainer
            onApplyButtonClick = {onApplyButtonClick}
            className = {styles.discountsFilter}
            onChangeCountry = { onChangeCountry}
            onChangeCity = {onChangeCity}
            onChangeCategory = {onChangeCategory}
            onSearchInputChange = {onSearchInputChange}
            onVendorSelectOptionChange = {onVendorSelectOptionChange}
            onSortFilterChange
            sortOptions ={discountsSortOptions}
            onSortFilterChange = {onSortFilterChange}
            filters = {discountsFilters}
            />
            <div className = {styles.discountsActions}>
            {isAdmin(user) && <AddNewItemButton
                btnTitle="Add new discount"
                onAddNewItem={onModalOpen}
                name = "add_discount"
              />}
            </div>
            <div className = {styles.discountsContainer}>
            {getDiscountsStatus.loading === true
              && <div className = {styles.loadingContainer}>
              <CircularProgress />
            </div>}
            {getDiscountsStatus.loading === false
              && <>
              <DiscountList
                discounts = {discountsArray}
                onCardClick = {onCardClick}
                favouriteDiscounts = {favourite}
              />
              <DiscountModal
                discount = {discount}
                isOpen = {isDiscountModalShown}
                onClose = {onDiscountModalClose}
                onDeleteDiscount = {onDeleteDiscount}
                favouriteDiscounts = {favourite}
              />
              {discountsFiltersApplied.pageNumber + 1 < discountsFiltersApplied.totalPages
                  && <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />}
              </>
            }
            </div>
          </div>
        <Modal isOpen={modalState} onClose={closeModal}>
          <CreateDiscount
            onModalClose={closeModal}
          />
        </Modal>
    </PageWrapper>
  );
}

export default Discounts;

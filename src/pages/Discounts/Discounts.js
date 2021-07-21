import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
import Vocabulary from '../../translations/vocabulary';

function Discounts() {
  const { t } = useTranslation();
  // mock data for favourite discounts
  const favourite = [];

  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);

  const getDiscountsStatus = useSelector((state) => state.discountsReducer.getDiscountsStatus);
  const discountsArray = useSelector(getDiscountsList);
  const discountById = useSelector((state) => state.discountsReducer.discountById);
  const getDiscountByIdStatus = useSelector((state) => state.discountsReducer.getDiscountByIdStatus);
  const discountsFilters = useSelector((state) => state.discountsReducer.discountsFilters);
  const discountsFiltersApplied = useSelector((state) => state.discountsReducer.discountsFiltersApplied);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(actions.locationActions.getCountries());
    dispatch(actions.categoryActions.getCategories());
    dispatch(actions.locationActions.getCities(discountsFilters.country));
    dispatch(actions.discountsActions.getDiscountsByUser(user?.id));
    // eslint-disable-next-line
  }, []);

  useDiscountsQueryChecker();

  const location = useLocation();
  const discountId = location.pathname.split('/')[2] || null;

  useEffect(() => {
    if (discountId) {
      dispatch(actions.discountsActions.getDiscountById(discountId));
      setIsDiscountModalShown(true);
    }
    // eslint-disable-next-line
  }, []);

  const onModalOpen = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  },
  [setModalState]);

  const onChangeCountry = (selectedCountry) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ country: selectedCountry?.countryCode || null }));
    dispatch(actions.discountsActions.updateDiscountsFilters({ city: null }));
    dispatch(actions.locationActions.getCities(selectedCountry?.countryCode));
  };

  const onChangeCity = (city) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ city: city?.label || null }));
  };

  const onChangeCategory = (category) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ category: category?.id || null, tags: null }));
  };

  const onChangeTags = (tags) => {
    const tagIds = tags.map((el) => el.value);
    dispatch(actions.discountsActions.updateDiscountsFilters({ tags: tagIds || null }));
  };

  const onVendorSelectOptionChange = (selectedVendor) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({ vendorTitle: selectedVendor?.label || '' }));
  };
  const onSearchInputChange = (descriptionSearchWord) => {
    dispatch(actions.discountsActions.updateDiscountsFilters({
      shortDescription: descriptionSearchWord, title: descriptionSearchWord
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
    dispatch(actions.discountsActions.getDiscountById(id));
    setIsDiscountModalShown(true);
  }, [dispatch]);

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
            onChangeTags = {onChangeTags}
            />
            <div className = {styles.discountsActions}>
            {isAdmin(user) && <AddNewItemButton
                btnTitle={t(Vocabulary.ADD_NEW_DISCOUNT)}
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
                key= {discountById?.id}
                discount = {discountById}
                isOpen = {isDiscountModalShown}
                onClose = {onDiscountModalClose}
                onDeleteDiscount = {onDeleteDiscount}
                favouriteDiscounts = {favourite}
                loadingStatus = {getDiscountByIdStatus.loading}
                modalContainerClasses = {styles.modalMinSize}
              />
              {discountsFiltersApplied.pageNumber + 1 < discountsFiltersApplied.totalPages
                  && <Pagination btnTitle={t(Vocabulary.SHOW_MORE)} onShowMoreClick={onShowMoreClick} />}
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

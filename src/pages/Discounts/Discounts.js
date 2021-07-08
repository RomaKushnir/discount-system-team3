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

function Discounts() {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
  const [discount, setDiscount] = useState(null);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountsList());
    dispatch(actions.locationActions.getLocationsList());
    dispatch(actions.categoryActions.getCategories());
  }, [dispatch]);

  const getDiscountsStatus = useSelector((state) => state.discountsReducer.getDiscountsStatus);
  const discountsArray = useSelector(getDiscountsList);
  const vendorsFilters = useSelector((state) => state.vendorReducer.vendorsFilters); // TEMPORARY, should be discount filters

  const onModalOpen = () => {
    setModalState(true);
  };

  const closeModal = useCallback(() => {
    setModalState(false);
  },
  [setModalState]);

  const onApplyButtonClick = (parameters) => {
    console.log(parameters);
  };
  const onChangeCountry = (selectedCountry) => {
    console.log(selectedCountry);
  };

  const onChangeCity = (city) => {
    console.log(city);
  };

  const onChangeCategory = (category) => {
    console.log(category);
  };

  const onVendorSelectOptionChange = (selectedVendor) => {
    console.log(selectedVendor);
  };
  const onSearchInputChange = (descriptionSearchWord) => {
    console.log(descriptionSearchWord);
  };

  const onSortFilterChange = () => {
    console.log('change');
  };

  const onShowMoreClick = () => {
    console.log('show more');
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
            filters = {vendorsFilters} // TEMPORARY, should be discount filters
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
              />
              <DiscountModal
                discount = {discount}
                isOpen = {isDiscountModalShown}
                onClose = {onDiscountModalClose}
                onDeleteDiscount = {onDeleteDiscount}
              />
              <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />
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

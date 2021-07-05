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
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SelectField from '../../components/SelectField';
import DiscountList from './components/DiscountList';
import AddNewItemButton from '../../components/AddNewItemButton';
import Modal from '../../components/Modal';
import CreateDiscount from './components/CreateDiscount';
import {
  getCountriesOptions,
  getCitiesGroupedByCountryOptions,
  getDiscountsList
} from '../../store/selectors';
import { discountsSortOptions } from '../../utilities/sortOptions';
import DiscountModal from './components/DiscountModal';
import Pagination from '../../components/Pagination/Pagination';
import Roles from '../../roles';

function Discounts() {
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);
  const [isDiscountModalShown, setIsDiscountModalShown] = useState(false);
  const [discount, setDiscount] = useState(null);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountsList());
    dispatch(actions.locationActions.getLocationsList());
  }, [dispatch]);

  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);

  const getDiscountsStatus = useSelector((state) => state.discountsReducer.getDiscountsStatus);

  const discountsArray = useSelector(getDiscountsList);

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

  const onChange = () => {
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
    // dispatch(actions.discountsActions.getDiscountsList());
    onDiscountModalClose();
  }, [dispatch]);

  return (
    <div className = {styles.containerFluid}>
      <div>
        <Header/>
        <main className = {styles.container}>
          <FiltersContainer
            onApplyButtonClick = {onApplyButtonClick}
            className = {styles.discountsFilter}
            countriesList={countriesOptions}
            citiesList={citiesOptions}
            categoriesList={[]}
            />
            <div className = {styles.discountsActions}>
            {user?.role.name === Roles.ADMIN && <AddNewItemButton
                btnTitle="Add new discount"
                onAddNewItem={onModalOpen}
                name = "add_discount"
              />}
              <SelectField
                options = {discountsSortOptions}
                initialValue = {discountsSortOptions[0]}
                onChange = {onChange}
              />
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
          </main>
        </div>

        <Modal isOpen={modalState} onClose={closeModal}>
          <CreateDiscount
            onModalClose={closeModal}
          />
        </Modal>
      <Footer/>
    </div>
  );
}

export default Discounts;

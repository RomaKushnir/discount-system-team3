import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import styles from './Discounts.module.scss';
import FiltersContainer from '../../components/FiltersContainer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SelectField from '../../components/SelectField';
import DiscountList from './components/DiscountList/DiscountList';
import OutlineButton from '../../components/OutlineButton';
import AddNewItemButton from '../../components/AddNewItemButton';
import Modal from '../../components/Modal';
import AddDiscountModal from './components/AddDiscountModal';
import {
  getCountriesOptions,
  getCitiesGroupedByCountryOptions
} from '../../store/selectors';
import sortList from '../../utilities/sortOptions';

function Discounts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.discountsActions.getDiscountsList());
    dispatch(actions.locationActions.getLocationsList());
  }, [dispatch]);

  const countriesOptions = useSelector(getCountriesOptions);
  const citiesOptions = useSelector(getCitiesGroupedByCountryOptions);

  const discounts = useSelector((state) => state.discountsReducer.discounts);

  const [modalState, setModalState] = useState(false);

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
              <AddNewItemButton
                btnTitle="Add new discount"
                onAddNewItem={onModalOpen}
                name = "add_discount"
              />
              <SelectField
                options = {sortList}
                initialValue = {sortList[0]}
                onChange = {onChange}
              />
            </div>
            <div className = {styles.discountsContainer}>
              <DiscountList
                discounts = {discounts}
              />
            </div>
            <div className = {styles.discountsShowMoreBtnWrap}>
              <OutlineButton
                btnText = "Show more"
                onClick = {onShowMoreClick}
                className = {styles.discountsShowMoreBtn}
              />
            </div>
          </main>
        </div>
        <Modal isOpen={modalState} onClose={closeModal}>
          <AddDiscountModal
            onModalClose={closeModal}
            discount={{ title: 'title' }}
          />
        </Modal>
      <Footer/>
    </div>
  );
}

export default Discounts;

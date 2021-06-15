import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Vendors.module.scss';
import Modal from '../../components/Modal';
import AddVendorModal from './components/AddVendor';
import VendorsList from './components/VendorsList';
import * as actions from '../../store/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FiltersContainer from '../../components/FiltersContainer';
import AddNewItemButton from '../../components/AddNewItemButton';
import SelectField from '../../components/SelectField';
import sortList from '../../mockData/sortList';// mock data to render select list
import VendorsListPage from '../../mockData/VendorsListPage';// mock data to render select list
import countriesList from '../../mockData/countriesList';// mock data to render select list
import citiesList from '../../mockData/citiesList';// mock data to render select list
import vendorsList from '../../mockData/vendorsList';// mock data to render select list
import Pagination from '../../components/Pagination/Pagination';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const currentUserCountryId = 1; // temporary

  const onModalOpen = () => {
    setIsOpen(true);
    dispatch(actions.locationActions.getCountriesList());
    dispatch(
      actions.locationActions.getSelectedCitiesList(currentUserCountryId)
    );
  };

  const onApplyButtonClick = () => {
    // apply filters
  };

  const onSortFilter = () => {
    // apply sort filter
  };

  const onShowMoreClick = () => {
    // do request to get more items
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <main className={styles.contentWrapper}>
          <FiltersContainer
            onApplyButtonClick={onApplyButtonClick}
            countriesList={countriesList}
            citiesList={citiesList}
            categoriesList={[]}
            vendorsList={vendorsList}
          />
          <div className={styles.vendorsActionsBlock}>
            <AddNewItemButton
              btnTitle="Add new vendor"
              onAddNewItem={onModalOpen}
            />
            <SelectField
              initialValue={[sortList[0]]}
              options={sortList}
              onChange={onSortFilter}
              isClearable={false}
              />
          </div>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <AddVendorModal onSave={() => setIsOpen(false)} />
          </Modal>
          <VendorsList vendors={VendorsListPage} />
          <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Vendors;

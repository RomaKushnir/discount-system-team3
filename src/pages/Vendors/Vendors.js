import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Vendors.module.scss';
import Modal from '../../components/Modal';
import AddVendor from './components/AddVendor/AddVendor';
import VendorsList from './components/VendorsList';
import * as actions from '../../store/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FiltersContainer from '../../components/FiltersContainer';
import VendorsListPage from '../../mockData/VendorsListPage';// mock data to render select list
import countriesList from '../../mockData/countriesList';// mock data to render select list
import citiesList from '../../mockData/citiesList';// mock data to render select list
import vendorsList from '../../mockData/vendorsList';// mock data to render select list
import OutlineButton from '../../components/OutlineButton';
import VendorsActionsContainer from './components/VendorsActionsContainer/VendorsActionsContainer';

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

  const onShowMore = () => {
    // do request to get more items
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <main className={styles['content-wrapper']}>
          <FiltersContainer
            onApplyButtonClick={onApplyButtonClick}
            countriesList={countriesList}
            citiesList={citiesList}
            categoriesList={[]}
            vendorsList={vendorsList}
          />
          <VendorsActionsContainer
            onSortFilter={onSortFilter}
            addNewItem={onModalOpen}
            />
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <AddVendor onSave={() => setIsOpen(false)} />
          </Modal>
          <VendorsList vendors={VendorsListPage} />
          <div className={styles['show-more-btn-wrap']}>
            <OutlineButton
              btnText="Show more"
              onClick={onShowMore}
              />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Vendors;

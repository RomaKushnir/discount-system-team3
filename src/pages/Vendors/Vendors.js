import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Pagination from '../../components/Pagination/Pagination';
import {
  getVendorsOptions,
  getCountriesOptions,
  getCitiesGroupedByCountryOptions
} from '../../store/reselect';

function Vendors() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    dispatch(actions.vendorActions.getVendors());
    dispatch(actions.locationActions.getLocationsList());
  }, [dispatch]);

  const vendors = useSelector((state) => state.vendorReducer.vendors);
  const locations = useSelector((state) => state.locationReducer.locationsList);
  const vendorsOptions = useSelector((state) => getVendorsOptions(state));
  const countriesOptions = useSelector((state) => getCountriesOptions(state));
  const citiesOptions = useSelector((state) => getCitiesGroupedByCountryOptions(state));

  const vendorsWithCities = vendors.map((el) => {
    const vendorLocation = locations.find((location) => location.id === el.locationId);
    return { ...el, location: vendorLocation.city };
  });

  const onModalOpen = (e, id) => {
    setIsOpen(true);
    dispatch(actions.locationActions.getLocationsList());

    if (e.target.name === 'edit') {
      const selectedVendor = vendors.find((el) => el.id === id);

      setVendor(selectedVendor);
    } else {
      setVendor({
        id: '',
        title: '',
        locationId: null,
        email: '',
        imageUrl: '',
        description: ''
      });
    }
  };

  const onDelete = (id) => {
    dispatch(actions.vendorActions.deleteVendor(id));
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

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
            countriesList={countriesOptions}
            citiesList={citiesOptions}
            categoriesList={[]}
            vendorsList={vendorsOptions}
          />
          <div className={styles.vendorsActionsBlock}>
            <AddNewItemButton
              btnTitle="Add new vendor"
              onAddNewItem={onModalOpen}
              name = "add"
            />
            <SelectField
              initialValue={[sortList[0]]}
              options={sortList}
              onChange={onSortFilter}
              isClearable={false}
              />
          </div>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <AddVendorModal
              onSave={closeModal}
              selectedVendor = {vendor}
            />
          </Modal>
          <VendorsList
            vendors={vendorsWithCities}
            onEdit = {onModalOpen}
            onDelete = {onDelete}
          />
          <Pagination btnTitle="Show more" onShowMoreClick={onShowMoreClick} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Vendors;
